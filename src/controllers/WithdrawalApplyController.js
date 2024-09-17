const { WithdrawalApplyMessage } = require('../models')
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/withdrawalapply');
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
    const replies = await WithdrawalApplyMessage.findAll({
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
            const AllMessages = await WithdrawalApplyMessage.findAll();
            const rootMessages = await WithdrawalApplyMessage.findAll({
              where: {
                [Op.or]: [
                  { senderId: req.params.userId },
                  { receiverId: req.params.userId }
                ],
                parentMessageId: ''
              }
            });
            const rootMessageIds = rootMessages.map(msg => msg.id);
            const replies = await WithdrawalApplyMessage.findAll({
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
            const { time, title, content, senderId, receiverId, parentMessageId } = req.body;
            const newMessage = {time, title, content, senderId, receiverId, parentMessageId };
            if (req.files['fileUrl']) {
                const uploadfile = req.files['fileUrl'][0];
                newMessage.fileUrl = uploadfile.filename; // Adjust field name based on your model
              }
           await WithdrawalApplyMessage.create(newMessage);
            const newMessageContent = await WithdrawalApplyMessage.findAll();
            res.send(newMessageContent);
          } catch (error) {
            res.status(500).send(error.message);
          }
    },

    async getMessages(req, res) {
        try {
          const userId = req.params.userId; // Assuming userId is provided in route parameters
    
          // Fetch root messages
          const rootMessages = await WithdrawalApplyMessage.findAll({
            where: {
                [Op.or]: [
                  { senderId: req.params.userId },
                  { receiverId: req.params.userId }
                ],
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