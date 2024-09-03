const { Customer } = require('../models')
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
			const customer = await Customer.create(req.body)
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
            // console.log("customer update",req.body)
            const {opportunity, name, katakana_name, phone_number, birthday,age, gender, cardType, prefecture, city, address } = req.body;
            const updateFields = {opportunity, name, katakana_name, phone_number, birthday,age, gender, cardType, prefecture, city, address};
            if (req.files['avatarimage']) {
                const avatarImage = req.files['avatarimage'][0];
                updateFields.avatar_url = avatarImage.filename; // Adjust field name based on your model
              }
              if (req.files['idcard']) {
                const idCard = req.files['idcard'][0];
                updateFields.idCard_url = idCard.filename; // Adjust field name based on your model
              }
            // console.log("customer file",updateFields)
            const customer = await Customer.update(updateFields, {
                where: {
                    id: req.body.id
                }
            })
            res.send({"customer":customer});
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update customer information"
            })
        }
    },
    async deleteCustomer(req, res) {
		try {
            const customerId = req.body.customerId;
            console.log(customerId,'customerId')
			const customer = await Customer.findOne({
                where: {
                    id: customerId // Condition to match the record
                  }
            })
            console.log(customer,'customer')
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
        // console.log(req.body)
        // console.log("name",phone_number)
        try {
            // Construct the search query
            const whereClause = [];

            if (name!='') {
                whereClause.push ({
                     name: { [Op.like]: `%${name}%` } 
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
            // console.log('id',req.params.customerId)
            const customer = await Customer.findByPk(req.params.customerId)
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

    upload
}