const { v4: uuidv4 } = require('uuid');
const { Profile } = require('../models');
const { Contact } = require('../models');
const { Setting } = require('../models');

const response = require('../helpers/response');
const { Op } = require('sequelize');

module.exports = {
async insert (req, res) {
    try {
        const errData = {};
        const userId = req.body.userId;
        const {username, fullname } = req.body.form;
        // find friend profile by username
        const friend = await Profile.findOne({
            where: { username: username }
        });
        // if the friend profile not found or
        // if the contact has been saved
        if (
          !friend ||
          (await Contact.findOne({
            where: {
              userId: userId,
              friendId: friend.user_id
            }
          }))
        ) {
          errData.statusCode = 401;
          errData.message = !friend
            ? 'User not found'
            : 'You have saved this contact';
    
          throw errData;
        }
    
        // if my contact has been saved by a friend
        const ifSavedByFriend = await Contact.findOne({
            where: {
                userId: friend.user_id,
                friendId: userId,
            }
        });
        const contact = await Contact.create({
            userId: userId,
            roomId: ifSavedByFriend ? ifSavedByFriend.roomId : uuidv4(),
            friendId: friend.user_id,
            fullname: fullname || friend.fullname,
            bio: friend.bio,
            avatar: friend.avatar,
          });
    
        response({
          res,
          statusCode: 201,
          message: 'Successfully added contact',
          payload: contact,
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

async find (req, res) {
    try { 
        const {userId} = req.body;
        const setting = await Setting.findOne({
            where: { userId: userId },
          });
            const contacts = await Contact.findAll({
              where: { userId: userId },
              include: {
                model: Profile,
                as: 'profile',
                attributes: ['fullname', 'updated_at'], // Include only necessary fields
              },
              logging: console.log, // This will log all SQL queries to the console

            });

        response({
          res,
          payload: contacts,
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
async deleteByFriendId (req, res) {
    try {
        const { friendId } = req.params;
        const userId = req.body.userId;

        const deletedCount = await Contact.destroy({
            where: {
              userId: userId,
              friendId: friendId
            }
        });
    
        response({
          res,
          message: 'Contact deleted successfully',
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