const { User } = require('../models')
const { Profile } = require('../models')
const response = require('../helpers/response');
const jwt = require('jsonwebtoken')
const decrypt = require('../helpers/decrypt');

module.exports = {
    async confirmUser(req, res) {
        try {
            const errData = {};
            const { email, password } = req.body;
            // console.log('password', encrypt(password))

            // Find user by username or email
            const user = await User.findOne({
                where: { email: email }
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
            const username = user.username;
            // Send response
            console.log('----to input confirm---',token, userId);
            response({
                res,
                statusCode: 200,
                message: 'Successfully logged in',
                payload: {token:token,userId:userId,username:username}, // -> send token to store in localStorage
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
    async checkUserName(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.params.userName
                },
                attributes: ["id"]
            })
            if (!user) {
                res.send({
                    userNameAvailable: true
                })
            }
            else {
                res.send({
                    userNameAvailable: false
                })
            }
        } catch (error) {
            res.status(500).send({
                error: "An error occured valid username checking."
            })
        }
    },
    async deleteAccount(req, res) {
        try {
            if (req.params.userId == req.user.id || req.user.priority == 1) {
                const user = await User.findByPk(req.params.userId)
                if (!user) {
                    return res.status(403).send({
                        error: 'No user to delete.'
                    })
                }
                await user.destroy();
                res.send({ id: user.id })
            }
            else {
                return res.status(403).send({
                    error: "You do not have that privilege to do that."
                })
            }
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to delete an user account"
            })
        }
    },
    async find(req, res) {
        try {
            // console.log("=======userid========",req.body.userId);
            const userId = req.body.userId;
            const user = await User.findOne( {
                where: { id: userId}
            })
            if (!user) {
                return res.status(403).send({
                    error: "User not found."
                })
            }
            response({
                res,
                payload: user,
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
    async getUserList(req, res) {
        try {
            const userId = req.user.id
            if (!userId) {
                return res.status(403).send({
                    error: "Request is not authenticated."
                })
            }
            const userList = await User.findAll({
                attributes: [
                    "id",
                    "store_name",
                    "store_type",
                    "full_anme",
                    "katakana_name",
                    "profile_image",
                    "email",
                    "phone_number",
                    "pasword",
                    "birthday",
                    "idcard_image",
                    "card_type",
                    "prefectures",
                    "city",
                    "address",
                    "resume",
                    "job_description",
                    "guarantor",
                    "pledge_image",
                    "staff_terms",
                ]
            })
            res.send(userList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get user list."
            })
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            res.send(user);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update user information"
            })
        }
    },
    async getUserById(req, res) {
        try {
            
            const {userId} = req.body
            console.log('=======',userId)
            const users = await Profile.findAll({

            })
            console.log('=======sss',users)
            const user = await Profile.findOne({
                where: {
                    user_id: userId
                }
            })

            if (!user) {
                return res.status(403).send({
                    error: "Email not registered."
                })
            }
            console.log('=======',user)
            res.send(user)
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    }
}