const { User } = require('../models')
const { Profile } = require('../models')
const response = require('../helpers/response');
const jwt = require('jsonwebtoken')
const decrypt = require('../helpers/decrypt');

const { Op } = require('sequelize');
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
            res.send(user)
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    },
    async getProfileById(req, res) {
        try {
            
            const {userId} = req.body
            // console.log('userId--------',userId)
            const profile = await Profile.findOne({
                where: {
                    user_id: userId
                }
            })

            if (!profile) {
                return res.status(403).send({
                    error: "Email not registered."
                })
            }
            res.send(profile)
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    },
    async upadateRegisterUserProfile(req, res) {
        try {
            console.log('adfasdfasdf',req.body)
            const {store_name, type, fullname,katakana_name, phone, birthday,age, gender, card_type, prefeature, city, address,staff_terms,guarantor } = req.body;
            const updateFields = {store_name, type, fullname,katakana_name, phone, birthday,age, gender, card_type, prefeature, city, address,staff_terms,guarantor};
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
            const profileId = req.body.id;
            // console.log('adfasdfasdf',updateFields)
            const profile = await Profile.update(updateFields,{
                where: {
                    id:profileId
                }
            })
            
            const userId = req.body.user_id; 

            const userUpdateField = {};
            userUpdateField.full_name = fullname;
            userUpdateField.store_name = store_name;
             console.log('userUpdateField',userUpdateField,userId)
            const user = await User.update(userUpdateField,{
                where:{
                    id:userId
                }
            });

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
    async getStoreUserList(req, res) {
        try {
            // console.log('aaaaaaaaaaaa------------')
            const store_name = req.body.storeName;
            // console.log('storename',store_name)
            const userList = await User.findAll({
                where:{
                    store_name:store_name
                }
            })
            res.send(userList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get user list."
            })
        }
    },
    //--------------------using for chat------------
    async getSuperVisorList(req, res) {
        try {
            const storeName = req.body.storeName;
            const userList = await User.findAll({
                where:{
                    store_name:storeName,
                    role_flag:'2'
                }
            })
            res.send(userList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get user list."
            })
        }
    },
    //-------------------admin part------------------------------------------
    async getUserProfileList(req, res) {
        try {
            // const userList = await Profile.findAll();
            const userList = await Profile.findAll({
                include: [
                  {
                    model: User,
                    attributes: ['role_flag'],
                    where: {
                      id: {
                        [Op.col]: 'Profile.user_id',
                      },
                    },
                  },
                ],
              });
            // console.log('userList------',userList)
            res.send(userList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get user list."
            })
        }
    },

    async userSearch(req, res) {
        const { store_name, type, full_name, phone, address, birthday } = req.body.params;
        // console.log("Request Params:", req.body.params);
    
        try {
            // Construct the search query
            const whereClause = [];
    
            if (store_name) {
                whereClause.push({
                    store_name: { [Op.like]: `%${store_name}%` }
                });
            }
            if (type) {
                whereClause.push({
                    type: { [Op.like]: `%${type}%` }
                });
            }
            if (full_name) {
                whereClause.push({
                    fullname: { [Op.like]: `%${full_name}%` }
                });
            }
            if (phone) {
                whereClause.push({
                    phone: { [Op.like]: `%${phone}%` }
                });
            }
            if (address) {
                whereClause.push({
                    address: { [Op.like]: `%${address}%` }
                });
            }
            if (birthday) {
                whereClause.push({
                    birthday: { [Op.like]: `%${birthday}%` }
                });
            }
    
            // console.log('Where Clause:', whereClause);
    
            // Construct the query
            const userList = await Profile.findAll({
                where: whereClause.length ? { [Op.and]: whereClause } : undefined, // Use `undefined` if no filters
            });
    
            res.send(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    async getIndividualProfileById(req, res) {
        try {
            
            const {userId} = req.body
            console.log('userId--------',userId)
            const profile = await Profile.findOne({
                where: {
                    user_id: userId
                }
            })

            if (!profile) {
                return res.status(403).send({
                    error: "Email not registered."
                })
            }
            res.send(profile)
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    },
    async updateUserProfile(req, res) {
        try {
            const {store_name, type, fullname,katakana_name, phone, birthday,age, gender, card_type, prefeature, city, address,staff_terms,guarantor } = req.body;
            const updateFields = {store_name, type, fullname,katakana_name, phone, birthday,age, gender, card_type, prefeature, city, address,staff_terms,guarantor};
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
    upload
}