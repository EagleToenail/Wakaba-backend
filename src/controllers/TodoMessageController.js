const { TodoMessage } = require('../models')
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/todoList');
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
    const replies = await TodoMessage.findAll({
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
            const AllMessages = await TodoMessage.findAll();
            const rootMessages = await TodoMessage.findAll({
              where: {
                [Op.or]: [
                  { senderId: req.params.userId },
                  { receiverId: req.params.userId }
                ],
                parentMessageId: ''
              }
            });
            const rootMessageIds = rootMessages.map(msg => msg.id);
            const replies = await TodoMessage.findAll({
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
           await TodoMessage.create(newMessage);
            const newMessageContent = await TodoMessage.findAll();
            res.send(newMessageContent);
          } catch (error) {
            res.status(500).send(error.message);
          }
    },

    async getMessages(req, res) {
        try {
          const userId = req.params.userId; // Assuming userId is provided in route parameters
    
          // Fetch root messages(not complete)
          const rootMessages1 = await TodoMessage.findAll({
            where: {
                [Op.or]: [
                  { senderId: req.params.userId },
                  { receiverId: req.params.userId }
                ],
                parentMessageId: '',
                complete:'0',
              },
              order: [['createdAt', 'DESC']]
            });
    
          // Fetch replies for each root message
          const result1 = await Promise.all(rootMessages1.map(async (root) => {
            const nestedReplies = await fetchReplies(root.id.toString());
            return {
              ...root.dataValues,
              replies: nestedReplies
            };
          }));

          // Fetch root messages(complete)
          const rootMessages2 = await TodoMessage.findAll({
            where: {
                [Op.or]: [
                  { senderId: req.params.userId },
                  { receiverId: req.params.userId }
                ],
                parentMessageId: '',
                complete:'1',
              },
              order: [['createdAt', 'DESC']]
            });
    
          // Fetch replies for each root message
          const result2 = await Promise.all(rootMessages2.map(async (root) => {
            const nestedReplies = await fetchReplies(root.id.toString());
            return {
              ...root.dataValues,
              replies: nestedReplies
            };
          }));

        const result = [...result1, ...result2];
        //   console.log('result+++++++++++++++++++',result)
          res.send(result);
        } catch (error) {
          console.error('Error fetching messages:', error);
          res.status(500).json({ error: 'An error occurred while fetching messages' });
        }
      },
      //---------------------------------------
        async permitOk(req,res) {
              try {
                  const messageId = req.body.messageId;
                  const updateField = {};
                  updateField.permission = '1';
                  updateField.read = '1';
                  console.log('fronend information',updateField,messageId)
              await TodoMessage.update(updateField,{
                    where:{
                        id:messageId,
                    }
              });
                res.send({success:true});
              } catch (error) {
                res.status(500).send(error.message);
              }
        },

        async completeOk(req,res) {
          try {
              const messageId = req.body.messageId;
              const parentMessageId = req.body.parentMessageId;
              const updateField = {};
              updateField.complete = '1';
              updateField.permission = '1';
              updateField.read = '1';
          await TodoMessage.update(updateField,{
                where:{
                    id:messageId,
                }
          });
          await TodoMessage.update(updateField,{
                where:{
                    id:parentMessageId,
                }
          });
            res.send({success:true});
          } catch (error) {
            res.status(500).send(error.message);
          }
        },
    //--------------------------------------------
    async getAlerts(req,res) {
      try{
        const userId = req.body.userId;
        console.log('userId',userId)
        const unreadCount = await TodoMessage.count({
              where: {
                receiverId: userId,
                read:'0'
              },
          });
          res.send({unreadCount});
      }catch(error){
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'An error occurred while fetching messages' });
      } 
    },

    upload
}