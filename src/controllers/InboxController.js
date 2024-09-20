const { Inbox } = require('../models');
// const User = require('../models/User');
const response = require('../helpers/response');
const { Op, Sequelize } = require('sequelize');
const db=require("../models/index");
module.exports = {
  async find(req, res) {
    try {
     
      const userId = req.body.userId; // Make sure req.user._id contains the correct value
      //mysql query test
      const query1=`SELECT JSON_EXTRACT(ownersId, '$[0]') AS id1 FROM Inboxes WHERE JSON_EXTRACT(ownersId, '$[0]')!="${userId}"; `
      const query2=`SELECT JSON_EXTRACT(ownersId, '$[1]') AS id1 FROM Inboxes WHERE JSON_EXTRACT(ownersId, '$[1]')!="${userId}"; `
      const id1=await db.sequelize.query(query1);     const id2=await db.sequelize.query(query2);
     console.log("this is my test")
     console.log(query1)
      if(id1.length!=0){
        console.log("id1 values ",id1.length)
        id1.forEach(id => {
          console.log(id);
          
        });
          console.log("id1 values ")

      }
      if(id2.length!=0){
        console.log(id2);
      }
      const query = `SELECT Inboxes.id, Profiles.fullname,  Inboxes.ownersId,  Inboxes.roomId,  Inboxes.roomType,  Inboxes.unreadMessage,  Inboxes.content FROM  Inboxes  LEFT JOIN Profiles ON Profiles.user_id IN (SUBSTRING_INDEX(SUBSTRING_INDEX(Inboxes.ownersId, '"', 2), '"', -1), SUBSTRING_INDEX(SUBSTRING_INDEX(Inboxes.ownersId, '"', 4), '"', -1)) WHERE Inboxes.roomType = 'private' AND Profiles.user_id!='${userId}'`;
      console.log("inbox controller query");
   	
      const inboxes=await db.sequelize.query(query);
            console.log(inboxes);

      console.log("inbox controller result");

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
