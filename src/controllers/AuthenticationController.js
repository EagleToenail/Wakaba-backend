const { User } = require('../models')
const { Profile } = require('../models')
const { Setting } = require('../models')

const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

const response = require('../helpers/response');

const encrypt = require('../helpers/encrypt');
const decrypt = require('../helpers/decrypt');

module.exports = {

    async register(req, res) {
        try {
            const { username,email, password} = req.body;
            const encryptedPassword = encrypt(password);
            // Create a new user record
            const user = await User.create({
              username,
              email,
              password: encryptedPassword,
            });
            // console.log(username,email, password);
            const setting = await Setting.create({
                userId:user.id,
                // If you want to override defaults or set other fields, include them here
              });
            const profile = await Profile.create({
                user_id:user.id, // Ensure userId is set
                username,
                email,
                fullname: username, // Map username to fullname
              });
        
            // generate access token
            const token = jwt.sign({ username: username }, 'shhhhh');
        
        
            response({
              res,
              statusCode: 201,
              message: 'Successfully created a new account',
              payload: token,
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

    async login(req, res) {
        try {
            // console.log('================')
            const errData = {};
            const { ID, password } = req.body;
            const username = ID;
            // console.log('================', username, password)
            // console.log('password', encrypt(password))

            // Find user by username or email
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: username },
                        { username },
                    ],
                },
            });

            // If user not found or invalid password
            if (!user) {
                errData.statusCode = 401;
                errData.message = 'Username or email not registered';

                throw errData;
            }

            // decrypt password
            decrypt(password, user.password);
            // generate access token
            const token = jwt.sign({ username: user.username }, 'shhhhh');
            const userId = user.id;
            // Send response
            // console.log('----login---',token, userId);
            response({
                res,
                statusCode: 200,
                message: 'Successfully logged in',
                payload: {token:token,userId:userId}, // -> send token to store in localStorage
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



}

