const { GeneralChatMessage } = require('../models')
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/generalchat');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
const upload = multer({ storage });

const fetchReplies = async (parentId) => {
    // Fetch replies for a given parent message ID
    const replies = await GeneralChatMessage.findAll({
      where: { parentMessageId: parentId }
    });
  
    // Recursively fetch replies for each reply
    const repliesWithNestedReplies = await Promise.all(replies.map(async (reply) => {
      const nestedReplies = await fetchReplies(reply.id);
      return {
        ...reply.dataValues,
        replies: nestedReplies
      };
    }));
  
    return repliesWithNestedReplies;
  };

module.exports = {
   // Fetch all root messages related to a user and their replies
	async getMessagesAndRepliesForUser  (req, res) {
        try {
            const AllMessages = await GeneralChatMessage.findAll();
            const rootMessages = await GeneralChatMessage.findAll({
              where: {
                [Op.or]: [
                  { senderId: req.params.userId },
                  { receiverId: req.params.userId }
                ],
                parentMessageId: ''
              }
            });
            const rootMessageIds = rootMessages.map(msg => msg.id);
            const replies = await GeneralChatMessage.findAll({
              where: {
                parentMessageId: {
                  [Op.in]: rootMessageIds
                }
              }
            });
            const result = rootMessages.map(root => ({
                  ...root.dataValues,
                  replies: replies.filter(reply => parseInt(reply.parentMessageId) === root.id)
                }
            ));
            res.send(result);
          } catch (error) {
            res.status(500).send(error.message);
          }
	},

// Create a new reply
    async createReply (req, res) {
        try {
            console.log('het---------------------')
            const { thread_name,time, title, content, senderId, parentMessageId } = req.body;
            const newMessage = {thread_name,time, title, content, senderId, parentMessageId };
            if (req.files['fileUrl']) {
                const uploadfile = req.files['fileUrl'][0];
                newMessage.fileUrl = uploadfile.filename; // Adjust field name based on your model
              }
           await GeneralChatMessage.create(newMessage);
            const newMessageContent = await GeneralChatMessage.findAll();
            res.send(newMessageContent);
          } catch (error) {
            res.status(500).send(error.message);
          }
    },

    async getMessages(req, res) {
        try {
          const thread_name = req.body.threadName; // Assuming userId is provided in route parameters
          // console.log('----------',thread_name)
          // Fetch root messages
          const rootMessages = await GeneralChatMessage.findAll({
            where: {
                thread_name:thread_name,
                parentMessageId: ''
              }
            });
    
          // Fetch replies for each root message
          const result = await Promise.all(rootMessages.map(async (root) => {
            const nestedReplies = await fetchReplies(root.id.toString());
            return {
              ...root.dataValues,
              replies: nestedReplies
            };
          }));
        //   console.log('result+++++++++++++++++++',result)
          res.send(result);
        } catch (error) {
          console.error('Error fetching messages:', error);
          res.status(500).json({ error: 'An error occurred while fetching messages' });
        }
      },

    upload
}