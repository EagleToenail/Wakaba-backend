const { User } = require('../models')
const { Profile } = require('../models')
const response = require('../helpers/response');
const jwt = require('jsonwebtoken')
const decrypt = require('../helpers/decrypt');

const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/userProfile');
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
            // console.log('----to input confirm---',token, userId);
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
    async getUserById(req, res) {
        try {
            
            const {userId} = req.body
            // console.log('=======',userId)
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })

            if (!user) {
                return res.status(403).send({
                    error: "Email not registered."
                })
            }
            // console.log('=======',user)
            res.send(user)
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    },
    async createUserProfile(req, res) {
        try {
            console.log("customer update")
            const {store_name, store_type, fullname,katakana_name, phone, birthday,age, gender, card_type, prefeature, city, address,staff_terms,guarantor } = req.body;
            const updateFields = {store_name, store_type, fullname,katakana_name, phone, birthday,age, gender, card_type, prefeature, city, address,staff_terms,guarantor};
            if (req.files['avatar']) {
            const avatar = req.files['avatar'][0];
            updateFields.avatar = avatar.filename; // Adjust field name based on your model
            }
            if (req.files['idcard_image']) {
            const idcard = req.files['idcard_image'][0];
            updateFields.idcard_image = idcard.filename; // Adjust field name based on your model
            }
            if (req.files['resume']) {
            const resume = req.files['resume'][0];
            updateFields.resume = resume.filename; // Adjust field name based on your model
            }
            if (req.files['job_description']) {
            const job_description = req.files['job_description'][0];
            updateFields.job_description = job_description.filename; // Adjust field name based on your model
            }
            if (req.files['pledge_image']) {
            const pledge_image = req.files['pledge_image'][0];
            updateFields.pledge_image = pledge_image.filename; // Adjust field name based on your model
            }
            console.log("profile data",updateFields)
            const profile = await Profile.update(updateFields, {
                where: {
                    id: req.body.id
                }
            })
            res.send({"success":true});
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update customer information"
            })
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
            const userList = await User.findAll({})
            res.send(userList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get user list."
            })
        }
    },
    upload
}