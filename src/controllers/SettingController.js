const { Setting } = require('../models');
// const User = require('../models/User');
const response = require('../helpers/response');
// const { Op } = require('sequelize');

module.exports = {
async find (req, res) {
    try {
        console.log("=======userid========",req.body.userId);
        const userId = req.body.userId;
        console.log(Setting, "user id aaaaa")
       console.log(typeof(userId)) 
        const setting = await Setting.findOne({
            where: { userId: userId}
          });
        console.log("=======setting========",setting);
        response({
        res,
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
},

async update (req, res) {
  try {
    console.log("=======userid========",req.body.userId);
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