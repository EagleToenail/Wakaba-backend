const { io } = global;
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

const {Profile} = require('../../models');
const {Group} = require('../../models');
const {Inbox} = require('../../models');
const {Chat} = require('../../models');

const InboxJoin = require('../../helpers/models/inboxJoin');

const uniqueId = require('../../helpers/uniqueId');

module.exports = (socket) => {
  socket.on('group/create', async (args, cb) => {
    try {
      const roomId = `group-${uuidv4()}`;

      // get full name of admin
      const profile = await Profile.findOne({
        where: {
          userId: args.adminId
        },
        attributes: ['fullname'] // Include only the fullname field
      });

      const link = `/group/+${uniqueId(16)}`;
      const group = await Group.create({
        ...args,
        roomId,
        link
      });


        const ownersId = args.participantsId;
        const profileFullname = profile.fullname; // Replace with actual value
        const adminId = args.adminId; // Replace with actual value

        const inbox = await Inbox.create({
          ownersId, // Assuming `ownersId` is an array or suitable data type for your model
          roomId,
          roomType: 'group',
          content: {
            senderName: profileFullname,
            from: adminId,
            text: 'group created',
            time: new Date().toISOString()
          }
        });

      // include master
      io.to(args.participantsId).emit('group/create', { group, ...inbox._doc });

      // return success callback
      cb({
        success: true,
        message: 'Group created successfully',
      });
    } catch (error0) {
      // return error callback
      cb({
        success: false,
        message: error0.message,
      });
    }
  });

  socket.on('group/add-participants', async (args) => {
    try {
      // get inviter fullname
      const inviter = await Profile.findOne({
        where: {
          userId: args.userId
        },
        attributes: ['fullname'] // Include only the fullname field
      });
      
      const groupId = args.groupId;
      const friendsId = args.friendsId;
      
      // Step 1: Fetch the existing group record
      const group = await Group.findOne({
        where: { id: groupId } // Adjust 'id' if your primary key is named differently
      });
      
      // Check if the group exists
      if (group) {
        // Get the current participantsId
        const existingParticipants = group.participantsId || [];
        
        // Filter out the friendsId that are already in the participants list
        const uniqueFriends = friendsId.filter(friendId => !existingParticipants.includes(friendId));
      
        // Step 2: Update the participantsId array
        await Group.update(
          { participantsId: [...existingParticipants, ...uniqueFriends] },
          { where: { id: groupId } }
        );
      }

      const roomId = group.roomId;
      const userId = args.userId;
      const senderName = inviter.fullname;
      
      // Step 1: Fetch the existing record
      const inbox = await Inbox.findOne({
        where: { roomId }
      });
      
      // Check if the inbox exists
      if (inbox) {
        // Get the current ownersId
        const existingOwnersId = inbox.ownersId || [];
      
        // Filter out the friendsId that are already in the ownersId list
        const uniqueFriends = friendsId.filter(friendId => !existingOwnersId.includes(friendId));
      
        // Step 2: Update the record
        await Inbox.update(
          {
            ownersId: [...existingOwnersId, ...uniqueFriends],
            fileId: null,
            content: {
              ...inbox.content, // Preserve existing content
              senderName,
              from: userId,
              text: `${friendsId.length} ${friendsId.length > 1 ? 'participants' : 'participant'} added`,
              time: new Date().toISOString()
            }
          },
          { where: { roomId } }
        );
      }

      const inboxes = await InboxJoin.find({ roomId: args.roomId });

      io.to(inboxes[0].ownersId).emit('inbox/find', inboxes[0]);
    } catch (error0) {
      console.log(error0.message);
    }
  });

  socket.on('group/edit', async ({ groupId, userId, form }, cb) => {
    try {
      const { name = '', desc = '' } = form;
      const errData = {};

      if (name.length < 1 || desc.length > 300) {
        errData.message =
          name.length < 1
            ? 'Group name is required!'
            : 'Description too long (max. 300)';
        throw errData;
      }

      const userId = args.userId; // Replace with actual userId value

      // Find the profile with the specified userId and only include the fullname field
      const profile = await Profile.findOne({
        where: {
          userId: userId
        },
        attributes: ['fullname'] // Specify the field to include
      });

      const groupId = args.groupId; // Replace with actual groupId value 
      // Update the record
      await Group.update(
        { name, desc }, // Fields to update
        { where: { id: groupId } } // Filter condition
      );
      
      // Optionally, retrieve the updated record if needed
      const updatedGroup = await Group.findOne({
        where: { id: groupId }
      });

      const roomId = group.roomId;
      const senderName = profile.fullname;
      const from = userId;
      const text = 'group edited';
      const time = new Date().toISOString();
      
      // Update the record
      await Inbox.update(
        {
          fileId: null,
          content: {
            ...inbox.content, // Preserve existing content, if necessary
            senderName,
            from,
            text,
            time
          }
        },
        {
          where: { roomId },
          returning: true // Optional: retrieve the updated record
        }
      );

      const inboxes = await InboxJoin.find({ roomId: group.roomId });

      // update group profile
      io.to(group.roomId).emit('group/edit', form);
      // update inbox
      io.to(inboxes[0].ownersId).emit('inbox/find', inboxes[0]);

      // success callback
      cb({ success: true, message: 'Group edited successfully' });
    } catch ({ message }) {
      // error callback
      cb({ success: false, message });
    }
  });

  socket.on('group/exit', async ({ userId, groupId }, cb) => {
    try {
      const groupId = args.groupId; // Replace with actual groupId value
      const userId = args.userId; // Replace with actual userId value
      
      // Step 1: Fetch the existing record
      const group = await Group.findOne({
        where: { id: groupId }
      });
      
      if (group) {
        const existingParticipants = group.participantsId || [];
        const updatedParticipants = existingParticipants.filter(participant => participant !== userId);
        await Group.update(
          { participantsId: updatedParticipants },
          { where: { id: groupId } }
        );
      }

      const participantsId = group.participantsId.filter(
        (elem) => elem !== userId
      );

      // if you're the last participant in the group
      if (participantsId.length === 0) {
        // permanently delete data (inbox, group, and chats) related to the group
        const roomId = group.roomId; // Replace with actual roomId value
        await Inbox.destroy({
          where: { roomId }
        });
        const groupId = args.groupId; // Replace with actual groupId value
        // Delete the record with the specified groupId
        await Group.destroy({
          where: { id: groupId } // Ensure the column name matches your model definition
        });
        // Delete the record with the specified roomId
        await Chat.destroy({
          where: { roomId }
        });
      } else {
        // if you're admin
        if (group.adminId === userId) {
          // give admin status to other participants in the group
          const adminId = participantsId[0];
          const groupId = args.groupId; // Replace with the actual groupId value
          // Update the record with the specified groupId
          await Group.update(
            { adminId }, // Fields to update
            {
              where: { id: groupId } // Condition to find the record
            }
          );
        }

        const userId = args.userId; // Replace with the actual userId value
        // Find the profile with the specified userId and select only the fullname field
        const profile = await Profile.findOne({
          where: { userId },
          attributes: ['fullname'] // Only include the fullname field in the result
        });

        const roomId = group.roomId; // Replace with the actual roomId value
        const profileFullname = profile.fullname; // Replace with the actual fullname value
        // Update the record with the specified roomId
        await Inbox.update(
          {
            fileId: null,
            'content.senderName': profileFullname,
            'content.from': userId,
            'content.text': 'left the group',
            'content.time': new Date().toISOString()
          },
          {
            where: { roomId },
            // Add conditions to manipulate the `ownersId` field
            // Sequelize doesn't natively support array manipulation like `$pull`
            // You may need to handle the array logic in application code if necessary
          }
        );

        const inboxs = await InboxJoin.find({ roomId: group.roomId });
        // update data in broadcast client
        socket.broadcast.to(participantsId).emit('group/exit', {
          groupId,
          userId,
          inbox: inboxs[0],
        });
      }

      socket.emit('inbox/delete', [group.roomId]);
      // success callback
      cb({ success: true, message: 'Successfully exit the group' });
    } catch ({ message }) {
      // error callback
      cb({ success: false, message });
    }
  });

  socket.on('group/add-admin', async (args) => {
    try {
      const { groupId, userId, participantId } = args;

      // Find the profile with the specified userId and select only the fullname field
      const master = await Profile.findOne({
        where: { userId },
        attributes: ['fullname'] // Only include the fullname field in the result
      });
      // Find the profile with the specified userId and select only the fullname field
      const friend = await Profile.findOne({
        where: { userId: participantId },
        attributes: ['fullname'] // Only include the fullname field in the result
      });

      await Group.update(
        { adminId: participantId }, // Fields to update
        {
          where: { id: groupId } // Condition to find the record
        }
      );

      const roomId = group.roomId; // Replace with the actual roomId value
      const masterFullname = master.fullname; // Replace with the actual master.fullname value
      const friendFullname = friend.fullname.split(' ')[0]; // Replace with the actual friend.fullname value
      
      // Update the record with the specified roomId
      await Inbox.update(
        {
          fileId: null,
          'content.senderName': masterFullname,
          'content.from': userId,
          'content.text': `add ${friendFullname} as admin`,
          'content.time': new Date().toISOString()
        },
        {
          where: { roomId }
          // You might need to adjust the field handling for 'content' depending on your model's schema
        }
      );

      const inboxes = await InboxJoin.find({ roomId: group.roomId });

      io.to(group.participantsId).emit('inbox/find', inboxes[0]);
      io.to(group.roomId).emit('group/add-admin', {
        ...group._doc,
        adminId: participantId,
      });
    } catch (error0) {
      console.error(error0.message);
    }
  });

  socket.on('group/remove-participant', async (args) => {
    try {
      const { groupId, userId, participantId } = args;

      // Find the profile with the specified userId and select only the fullname field
      const master = await Profile.findOne({
        where: { userId }, // Filter condition
        attributes: ['fullname'] // Only include the fullname field in the result
      });
      const friend = await Profile.findOne({
        where: { userId: participantId }, // Filter condition
        attributes: ['fullname'] // Only include the fullname field in the result
      });

        // Update the group to remove the participantId from the participantsId JSON array
        await Group.update(
          {
            participantsId: sequelize.json(
              `JSON_REMOVE(participantsId, JSON_UNQUOTE(JSON_SEARCH(participantsId, 'one', '${participantId}')))`
            ),
          },
          {
            where: {
              id: groupId,
              participantsId: {
                [Op.contains]: [participantId]
              }
            }
          }
        );

        // Define necessary values
        const roomId = group.roomId; // Replace with actual group roomId

        // Update the inbox record
        await Inbox.update(
          {
            ownersId: Sequelize.json(
              `JSON_REMOVE(ownersId, JSON_UNQUOTE(JSON_SEARCH(ownersId, 'one', ?)))`
            ),
            fileId: null,
            'content.senderName': master.fullname,
            'content.from': userId,
            'content.text': `removed ${friend.fullname.split(' ')[0]}`,
            'content.time': new Date().toISOString(),
          },
          {
            where: { roomId },
            bind: [participantId]
          }
        );

      const inboxes = await InboxJoin.find({ roomId: group.roomId });

      // refresh inbox
      socket.broadcast
        .to(participantId)
        .emit('inbox/delete', [inboxes[0].roomId]);
      io.to(inboxes[0].ownersId).emit('inbox/find', inboxes[0]);

      // refresh group participants
      io.to(group.roomId).emit('group/remove-participant', args);
    } catch (error0) {
      console.error(error0.message);
    }
  });
};
