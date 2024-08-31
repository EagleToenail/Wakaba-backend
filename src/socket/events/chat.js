const { io } = global;
const cloud = require('cloudinary').v2;
const { Op, Sequelize } = require('sequelize');

const InboxModel = require('../../models/Inbox');
const ChatModel = require('../../models/Chat');
const FileModel = require('../../models/File');
const ProfileModel = require('../../models/Profile');

const Inbox = require('../../helpers/models/inbox');
const uniqueId = require('../../helpers/uniqueId');

module.exports = (socket) => {
  // event when user sends message
  socket.on('chat/insert', async (args) => {
    try {
      let fileId = null;
      let file;

      if (args.file) {
        const arrOriname = args.file.originalname.split('.');
        const format =
          arrOriname.length === 1 ? 'txt' : arrOriname.reverse()[0];

        const upload = await cloud.uploader.upload(args.file.url, {
          folder: 'chat',
          public_id: `${uniqueId(20)}.${format}`,
          resource_type: 'auto',
        });

        fileId = upload.public_id;

        file = await FileModel.create({
          fileId,
          url: upload.url,
          originalname: args.file.originalname,
          type: upload.resource_type,
          format,
          size: upload.bytes,
        });
        
      }

      const chat = await ChatModel.create({ ...args, fileId });
      const profile = await ProfileModel.findOne({
        where: { userId: args.userId },
        attributes: ['userId', 'avatar', 'fullname']
      });

      // create a new inbox if it doesn't exist and update it if exists
      async function upsertInbox(args, profile, chat, file) {
        try {
          // Find the record by roomId
          let inbox = await InboxModel.findOne({
            where: { roomId: args.roomId }
          });
      
          // If the record exists, update it
          if (inbox) {
            await inbox.update({
              unreadMessage: inbox.unreadMessage + 1,
              roomId: args.roomId,
              ownersId: args.ownersId,
              fileId: file,
              deletedBy: [], // Assuming `deletedBy` is an array
              content: {
                from: args.userId,
                senderName: profile.fullname,
                text: chat.text || chat.text.length > 0
                  ? chat.text
                  : file.originalname,
                time: chat.createdAt,
              },
            });
          } else {
            // If the record does not exist, create a new one
            await InboxModel.create({
              roomId: args.roomId,
              unreadMessage: 1,
              ownersId: args.ownersId,
              fileId: file,
              deletedBy: [], // Assuming `deletedBy` is an array
              content: {
                from: args.userId,
                senderName: profile.fullname,
                text: chat.text || chat.text.length > 0
                  ? chat.text
                  : file.originalname,
                time: chat.createdAt,
              },
            });
          }
        } catch (error) {
          console.error('Error upserting inbox:', error);
        }
      }

      const inboxes = await Inbox.find({ ownersId: { $all: args.ownersId } });

      io.to(args.roomId).emit('chat/insert', { ...chat._doc, profile, file });
      // send the latest inbox data to be merge with old inbox data
      io.to(args.ownersId).emit('inbox/find', inboxes[0]);
    } catch (error0) {
      console.log(error0.message);
    }
  });

  // event when a friend join to chat room and reads your message
  socket.on('chat/read', async (args) => {
    try {
      const ownersIdArray = args.ownersId;

      await InboxModel.update(
        { unreadMessage: 0 },
        {
          where: {
            roomId: args.roomId,
            [Op.and]: [
              Sequelize.json('ownersId'), {
                [Op.contains]: ownersIdArray
              }
            ]
          }
        }
      );

      await ChatModel.update(
        { readed: true }, // The fields to update
        {
          where: {
            roomId: args.roomId,
            readed: false // Conditions for selecting records to update
          }
        }
      );

      const inboxes = await Inbox.find({ ownersId: { $all: args.ownersId } });

      io.to(args.ownersId).emit('inbox/read', inboxes[0]);
      io.to(args.roomId).emit('chat/read', true);
    } catch (error0) {
      console.log(error0.message);
    }
  });

  let typingEnds = null;
  socket.on('chat/typing', async ({ roomId, roomType, userId }) => {
    clearTimeout(typingEnds);

    const isGroup = roomType === 'group';
    const typer = isGroup
      ? await ProfileModel.findOne({ userId }, { fullname: 1 })
      : null;

    socket.broadcast
      .to(roomId)
      .emit(
        'chat/typing',
        isGroup ? `${typer.fullname} typing...` : 'typing...'
      );

    typingEnds = setTimeout(() => {
      socket.broadcast.to(roomId).emit('chat/typing-ends', true);
    }, 1000);
  });

  // delete chats
  socket.on(
    'chat/delete',
    async ({ userId, chatsId, roomId, deleteForEveryone }) => {
      try {
        // delete attached files
        const handleDeleteFiles = async (query = {}) => {
          const chats = await ChatModel.findAll({
            where: {
              _id: {
                [Op.in]: chatsId // Filter by IDs in chatsId array
              },
              roomId, // Filter by roomId
              ...query // Additional query conditions
            },
            attributes: ['fileId'] // Specify which fields to include in the result
          });

          const filesId = chats
            .filter((elem) => !!elem.fileId)
            .map((elem) => elem.fileId);

          if (filesId.length > 0) {
            await FileModel.destroy({
              where: {
                roomId, // Filter by roomId
                fileId: {
                  [Op.in]: filesId // Filter by fileId in the filesId array
                }
              }
            });

            await cloud.api.delete_resources(filesId, {
              resource_type: 'image',
            });
            await cloud.api.delete_resources(filesId, {
              resource_type: 'video',
            });
            await cloud.api.delete_resources(filesId, { resource_type: 'raw' });
          }
        };

        if (deleteForEveryone) {
          await handleDeleteFiles({});

          await ChatModel.destroy({
            where: {
              roomId, // Filter by roomId
              _id: {
                [Op.in]: chatsId // Filter by _id in the chatsId array
              }
            }
          });

          io.to(roomId).emit('chat/delete', { userId, chatsId });
        } else {
        await ChatModel.update(
          {
            deletedBy: Sequelize.json('JSON_ARRAY_APPEND(deletedBy, "$", :userId)') // Appends userId to the JSON array
          },
          {
            where: {
              roomId,
              _id: {
                [Op.in]: chatsId
              }
            },
            replacements: { userId }
          }
        );

          // delete permanently if this message has been
          // deleted by all room participants
          const inbox = await InboxModel.findOne({
            where: {
              roomId // Filter by roomId
            },
            attributes: ['ownersId'] // Include only the ownersId field
          });
          // Extract ownersId from the result
          const ownersId = inbox ? inbox.ownersId : null;

          await handleDeleteFiles({ deletedBy: { $size: ownersId.length } });

          const minDeletedByCount = ownersId.length; // Calculate the minimum count from ownersId
          await ChatModel.destroy({
            where: {
              roomId,
              [Sequelize.literal('JSON_LENGTH(deletedBy)')]: {
                [Op.gte]: minDeletedByCount
              }
            }
          });

          socket.emit('chat/delete', { userId, chatsId });
        }
      } catch (error0) {
        console.error(error0.message);
      }
    }
  );
};
