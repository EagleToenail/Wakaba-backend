const cloud = require('cloudinary').v2;

const {Inbox} = require('../models');
const {Chat} = require('../models');
const {File} = require('../models');

const response = require('../helpers/response');
const ChatJoin = require('../helpers/models/chats');

const { Op } = require('sequelize');

module.exports = {
async findByRoomId (req, res) {
    try {
        const { skip, limit} = req.query;
        const chats = await ChatJoin.find(req.params.roomId, { skip, limit });
        response({
          res,
          message: `${chats.length} chats found`,
          payload: chats,
        });
      } catch (error0) {
        response({
          res,
          statusCode: error0.statusCode || 500,
          success: false,
          message: error0.message,
        });
      }
},

async deleteByRoomId (req, res) {
    try {
        const { roomId } = req.params;
        const userId = req.body.userId;
    
        // push userId into deletedBy field
        const inbox = await Inbox.findOne({
            where: { roomId: roomId }
          });
        
          if (inbox) {
            // Check if userId is already in the deletedBy array
            const deletedByArray = inbox.deletedBy || [];
            if (!deletedByArray.includes(userId)) {
              // Update the record if userId is not already in the array
              await Inbox.update(
                { deletedBy: [...deletedByArray, userId] },
                { where: { roomId: roomId } }
              );
              console.log('Record updated with new deletedBy userId');
            } else {
              console.log('UserId already in the deletedBy array');
            }
          } else {
            console.log('No inbox found with that roomId');
          }
    
        if (inbox.deletedBy.length + 1 >= inbox.ownersId.length) {
            await Inbox.destroy({
                where: { roomId: roomId }
              });
            await Chat.destroy({
                where: { roomId: roomId }
              });
        } else {
              const chats = await Chat.findAll({
                where: { roomId: roomId }
              });
            
              // Process each chat record
              for (const chat of chats) {
                const deletedByArray = chat.deletedBy || [];
                
                // Check if userId is already in the deletedBy array
                if (!deletedByArray.includes(userId)) {
                  // Update the record to include the new userId in the deletedBy array
                  await Chat.update(
                    { deletedBy: [...deletedByArray, userId] },
                    { where: { id: chat.id } }
                  );
                  console.log(`Updated chat with id ${chat.id}`);
                } else {
                  console.log(`UserId ${userId} already in deletedBy array for chat with id ${chat.id}`);
                }
              }
        }
    
      
        // Step 1: Find chats that match the roomId and have the deletedBy array with the size equal to inbox.ownersId.length
        const chatAll = await Chat.findAll({
          where: {
            roomId: roomId
          }
        });
      
        // Filter chats where the size of deletedBy matches inbox.ownersId.length
        const chatsToDelete = chatAll.filter(chat => {
          return chat.deletedBy && chat.deletedBy.length === inbox.ownersId.length;
        });
      
        // Get IDs of chats to delete
        const idsToDelete = chatsToDelete.map(chat => chat.id);
      
        // Step 2: Delete the records with the IDs collected
        const deletedCount = await Chat.destroy({
          where: {
            id: idsToDelete
          }
        });

        const chats = await ChatJoin.find(
          { roomId, deletedBy: { $size: inbox.ownersId.length } },
          { fileId: 1 }
        );
    
        if (x.deletedCount > 0) {
          const filesId = chats
            .filter((elem) => !!elem.fileId)
            .map((elem) => elem.fileId);
    
          if (filesId.length > 0) {
            const deletedCount = await File.destroy({
                where: {
                  roomId: roomId,
                  fileId: filesId
                }
              });
    
            await cloud.api.delete_resources(filesId, { resource_type: 'image' });
            await cloud.api.delete_resources(filesId, { resource_type: 'video' });
            await cloud.api.delete_resources(filesId, { resource_type: 'raw' });
          }
        }
    
        response({
          res,
          message: 'Chat deleted successfully',
        });
      } catch (error0) {
        response({
          res,
          statusCode: error0.statusCode || 500,
          success: false,
          message: error0.message,
        });
      }
}

}