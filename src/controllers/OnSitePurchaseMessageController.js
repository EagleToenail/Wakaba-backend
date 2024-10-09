const { TodoMessage } = require('../models')
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/onsitepurchase');
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
            const {onsitepurchase_id, time,store_name, title, content, senderId, receiverId, parentMessageId ,permission,read} = req.body;
            const newMessage = {onsitepurchase_id, time,store_name, title, content, senderId, receiverId, parentMessageId,permission,read };
            if (req.files['fileUrl']) {
                const uploadfile = req.files['fileUrl'][0];
                newMessage.fileUrl = uploadfile.filename; // Adjust field name based on your model
              }
           await TodoMessage.create(newMessage);
            res.send({success:true});
          } catch (error) {
            res.status(500).send(error.message);
          }
    },

    async getMessages(req, res) {
        try {
          const userId = req.body.userId; // Assuming userId is provided in route parameters
    
          // Fetch root messages
          const rootMessages = await TodoMessage.findAll({
            where: {
                [Op.or]: [
                  { senderId: userId },
                  { receiverId: userId }
                ],
                onsitepurchase_id: {
                  [Op.ne]: ''  // Using Sequelize operator to check for not null
                },
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
                parentMessageId:'',
                receiverId: userId,
                read:'0',
                onsitepurchase_id: {
                  [Op.ne]: ''  // Using Sequelize operator to check for not null
                }
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