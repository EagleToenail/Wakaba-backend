const { Inbox } = require('../models');
// const User = require('../models/User');
const response = require('../helpers/response');
const { Op, Sequelize } = require('sequelize');
const db=require("../models/index");
module.exports = {
  async find(req, res) {
    try {
     
      const userId = req.body.userId; // Make sure req.user._id contains the correct value
      const query = `
            SELECT Inboxes.id, Inboxes.ownersId, Inboxes.roomId, Inboxes.roomType, Inboxes.archivedBy, Inboxes.unreadMessage, Inboxes.fileId, Inboxes.deletedBy, Inboxes.content , Profiles.fullname
            FROM Inboxes  LEFT JOIN Profiles ON  FIND_IN_SET(CONCAT('"', Profiles.user_id, '"'), REPLACE(REPLACE(Inboxes.ownersId, '[', ''), ']', '')) > 0  
						WHERE JSON_CONTAINS(ownersId, '"${userId}"' ,'$') AND Profiles.user_id!="${userId}";`;
      
   
      const inboxes=await db.sequelize.query(query)

      response({
        res,
        payload: inboxes,
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

  async update(req, res) {
    try {
      console.log("=======userid========", req.body.userId);
      const userId = req.body.userId;
      await Setting.update(
        req.body, // Data to update
        {
          where: {
            userId: userId // Condition to match the record
          }
        }
      );
      const setting = await Setting.findOne({
        where: {
          userId: userId // Condition to match the record
        }
      });

      response({
        res,
        message: 'Successfully updated account settings',
        payload: setting,
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
