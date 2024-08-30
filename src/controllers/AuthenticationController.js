const { User } = require('../models')
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

const response = require('../helpers/response');

const encrypt = require('../helpers/encrypt');
const decrypt = require('../helpers/decrypt');

module.exports = {
    async login(req, res) {
        try {
            console.log('================')
            const errData = {};
            const { ID, password } = req.body;
            const username = ID;
            console.log('================', username, password)
            console.log('password', encrypt(password))

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
            const token = jwt.sign({ _id: user._id }, 'shhhhh');

            // Send response
            response({
                res,
                statusCode: 200,
                message: 'Successfully logged in',
                payload: token, // -> send token to store in localStorage
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

