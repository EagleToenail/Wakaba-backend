const { io } = global;
const cloud = require('cloudinary').v2;
const { Op, literal , Sequelize } = require('sequelize');

const {Inbox} = require('../../models');
const {Chat} = require('../../models');
const {File} = require('../../models');
const {Profile} = require('../../models');

const InboxJoin = require('../../helpers/models/inboxJoin');
const uniqueId = require('../../helpers/uniqueId');
const { text } = require('express');
const db=require("../../models/index");

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

        file = await File.create({
          fileId,
          url: upload.url,
          originalname: args.file.originalname,
          type: upload.resource_type,
          format,
          size: upload.bytes,
        });
        
      }
      const chat = await Chat.create({ ...args, fileId });
      const profile = await Profile.findOne({
        where: { user_id: args.userId },
        attributes: ['user_id', 'avatar', 'fullname']
      });

      // create a new inbox if it doesn't exist and update it if exists
      // async function upsertInbox(args, profile, chat, file) {
        try {
          // Find the record by roomId
          let inbox = await Inbox.findOne({
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
            await Inbox.create({
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
        const query = `SELECT *
          FROM inboxes AS Inbox
          LEFT JOIN profiles AS profiles ON FIND_IN_SET(CONCAT('"', profiles.user_id, '"'), 
                REPLACE(REPLACE(Inbox.ownersId, '[', ''), ']', '')) > 0 
          LEFT JOIN files AS file ON Inbox.fileId = file.id 
          WHERE Inbox.roomType = 'private' AND profiles.user_id != '${args.userId}'
          GROUP BY profiles.user_id;
          `;

      
      const inboxes=await db.sequelize.query(query)        
        const chatData = chat.toJSON();

        io.to(args.roomId).emit('chat/insert', { profile, file,  text: chatData.text ,userId: args.userId});
      // send the latest inbox data to be merge with old inbox data
      io.to(args.ownersId).emit('inbox/find', inboxes);
    } catch (error0) {
      console.log(error0.message);
    }
  });

  // event when a friend join to chat room and reads your message
  socket.on('chat/read', async (args) => {
    try {   

      await Inbox.update(
        { unreadMessage: 0 },
        {
          where: {
            roomId: args.roomId,                  
          }
        }
      );   

      await Chat.update(
        { readed: true }, // The fields to update
        {
          where: {
            roomId: args.roomId,
            readed: false // Conditions for selecting records to update
          }
        }
      );
      const query = `SELECT *
          FROM inboxes AS Inbox
          LEFT JOIN profiles AS profiles ON FIND_IN_SET(CONCAT('"', profiles.user_id, '"'), 
                REPLACE(REPLACE(Inbox.ownersId, '[', ''), ']', '')) > 0 
          LEFT JOIN files AS file ON Inbox.fileId = file.id 
          WHERE Inbox.roomType = 'private' AND profiles.user_id != '${args.userId}'
          GROUP BY profiles.user_id;
          `;

    const inboxes=await db.sequelize.query(query);      
      io.to(args.ownersId).emit('inbox/read', inboxes);
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
      ? await Profile.findOne({ userId }, { fullname: 1 })
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
          const chats = await Chat.findAll({
            where: {
              id: {
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
            await File.destroy({
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

          await Chat.destroy({
            where: {
              roomId, // Filter by roomId
              _id: {
                [Op.in]: chatsId // Filter by _id in the chatsId array
              }
            }
          });

          io.to(roomId).emit('chat/delete', { userId, chatsId });
        } else {
        await Chat.update(
          {
            deletedBy: Sequelize.json('JSON_ARRAY_APPEND(deletedBy, "$", :userId)') // Appends userId to the JSON array
          },
          {
            where: {
              roomId,
              id: {
                [Op.in]: chatsId
              }
            },
            replacements: { userId }
          }
        );

          // delete permanently if this message has been
          // deleted by all room participants
          const inbox = await Inbox.findOne({
            where: {
              roomId // Filter by roomId
            },
            attributes: ['ownersId'] // Include only the ownersId field
          });
          // Extract ownersId from the result
          const ownersId = inbox ? inbox.ownersId : null;

          await handleDeleteFiles({ deletedBy: { $size: ownersId.length } });

          const minDeletedByCount = ownersId.length; // Calculate the minimum count from ownersId
          await Chat.destroy({
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
