const { Customer } = require('../models')
const { CustomerPastVisitHistory } = require('../models')

const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/customer');
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
	async createCustomer(req, res) {
		try {
            console.log("customer create",req.body)
            const {opportunity, full_name, katakana_name, phone_number, birthday, job,email,age, gender, cardType, prefeature, city, address ,shop,trigger} = req.body;
            const createFields = {opportunity, full_name, katakana_name, phone_number,job,email, birthday,age, gender, cardType, prefeature, city, address,shop,trigger};
            if (req.files['avatarimage']) {
                const avatarImage = req.files['avatarimage'][0];
                createFields.avatar_url = avatarImage.filename; // Adjust field name based on your model
                }
            if (req.files['idcard']) {
            const idCard = req.files['idcard'][0];
            createFields.idCard_url = idCard.filename; // Adjust field name based on your model
            }
            console.log("cusotmer data",createFields)
			const customer = await Customer.create(createFields)
			res.send(customer)
		} catch (err) {
			res.status(500).send({
				error: "An error occured when trying to create a customer."
			})
		}
	},
    async getCustomerList(req, res) {
        try {
            const customerList = await Customer.findAll({})
            // console.log("customerList",customerList)
            res.send(customerList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get customer list."
            })
        }
    },
    async updateCustomer(req, res) {
        try {
            // console.log("profile update",req.body)
            const {opportunity, full_name, katakana_name, phone_number,job,email, birthday,age, gender, cardType, prefeature, city, address,item1,item2,item3 } = req.body;
            const updateFields = {opportunity, full_name, katakana_name, phone_number, job,email, birthday,age, gender, cardType, prefeature, city,address,item1,item2,item3};
            if (req.files['avatarimage']) {
                const avatarImage = req.files['avatarimage'][0];
                updateFields.avatar_url = avatarImage.filename; // Adjust field name based on your model
              }
              if (req.files['idcard']) {
                const idCard = req.files['idcard'][0];
                updateFields.idCard_url = idCard.filename; // Adjust field name based on your model
              }
            // console.log("customer file",updateFields)
            await Customer.update(updateFields, {
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
    async deleteCustomer(req, res) {
		try {
            const customerId = req.body.customerId;
            // console.log(customerId,'customerId')
			const customer = await Customer.findOne({
                where: {
                    id: customerId // Condition to match the record
                  }
            })
            // console.log(customer,'customer')
			if (!customer) {
				return res.status(403).send({
					error: 'No customer to delete.'
				})
			}
			await customer.destroy()
			res.send(customer)

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a customer.'
			})
		}
	},
    async searchCustomer(req, res) {
       
        const { name, address, tel } = req.body.params;
        const phone_number = tel;
        console.log("asd",req.body)
        try {
            // Construct the search query
            const whereClause = [];

            if (name!='') {
                whereClause.push ({
                     full_name: { [Op.like]: `%${name}%` } 
                });
            }
            if (address!='') {
                whereClause.push ({
                    address: { [Op.like]: `%${address}%` } 
               });
            }
            if (phone_number!='') {
                whereClause.push ({
                    phone_number: { [Op.like]: `%${phone_number}%` } 
               });
            }
            // console.log('ccc',whereClause.length)
            // console.log('ccc',whereClause)
            if(whereClause.length!=0){
                const customers = await Customer.findAll({
                    where: {
                        [Op.or]: whereClause
                    }
                });
                // console.log(customers)
                res.send(customers);
            }else{
                const customers = await Customer.findAll();
                // console.log(customers)
                res.send(customers);
            }

        } catch (err) {
            res.status(500).send({
                error: "An error occurred when trying to search for customers."
            });
        }
    },
    async getCustomerById(req, res) {
        try { 
            //  console.log('id',req.params.customerId)
            const customer = await Customer.findByPk(req.params.customerId)
            // console.log('searchResult',customer);
            if (!customer) {
                return res.status(403).send({
                    error: "Customer not found."
                })
            }
            // console.log(customer)
            res.send(customer)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    },
    async getCustomerPastVisitHistory(req,res) {
        try { 
            //  console.log('123id',req.params.customerId)
            const customerId = req.params.customerId;
            const customerpastvisithistory = await CustomerPastVisitHistory.findOne({
                where: { customerId: customerId }
            });
            // console.log(customerpastvisithistory)
            if(!customerpastvisithistory.length){
                res.send([customerpastvisithistory])
            } else {
                res.send(customerpastvisithistory)
            }     
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    },
    async addCustomerItem(req,res) {
        try { 
                const customerId = req.body.customerId;
                const item1 = req.body.item1;
                const item2 = req.body.item2;
                const item3 = req.body.item3;
                console.log('received information',customerId,item1,item2,item3);
                await Customer.update(
                    {item1,item2,item3}, 
                    {
                        where: {
                            id: customerId
                        }
                })
                res.send({"success":true})
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    },

    upload
}