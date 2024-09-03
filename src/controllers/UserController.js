const { User } = require('../models')
const response = require('../helpers/response');

module.exports = {
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
    async getUserByEmail(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.params.email
                },
                attributes: ['id']
            })
            if (!user) {
                return res.status(403).send({
                    error: "Email not registered."
                })
            }
            res.send(user)
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    }
}