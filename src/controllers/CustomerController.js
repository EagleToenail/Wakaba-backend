const { Customer } = require('../models')
const { Master } = require('../models')
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
        try{
            console.log("customer create",req.body)
            const {visit_type, full_name, katakana_name, phone_number, birthday, job,email,age, gender, cardType, idcard_number, prefeature, city, address ,shop,trigger,brand_type,special_note} = req.body;
            const createFields = {visit_type, full_name, katakana_name, phone_number,job,email, birthday,age, gender, cardType, idcard_number, prefeature, city, address,shop,trigger,brand_type,special_note};
            if (req.files['avatarimage']) {
                const avatarImage = req.files['avatarimage'][0];
                createFields.avatar_url = avatarImage.filename; // Adjust field name based on your model
                }
            if (req.files['idcard']) {
            const idCard = req.files['idcard'][0];
            createFields.idCard_url = idCard.filename; // Adjust field name based on your model
            } 

            Object.keys(createFields).forEach(key => {
                if (createFields[key] === '' || createFields[key] === undefined) {
                    delete createFields[key];
                }
            });
            console.log("cusotmer data",createFields)
            const customer = await Customer.create(createFields)
            res.send(customer)
        }catch (err) {
            console.error("Error updating customer:", err); // Log the error for debugging
            res.status(500).send({
                error: "An error occurred when trying to update customer information"
            });
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
            const {shop, visit_type, full_name, katakana_name, phone_number,job,email,trigger,brand_type, birthday,age, gender, cardType,idcard_number, prefeature, city, address,special_note,item1,item2,item3,item4,item5 } = req.body;
            const updateFields = {shop, visit_type, full_name, katakana_name, phone_number, job,email,trigger,brand_type, birthday,age, gender, cardType, idcard_number, prefeature, city,address,special_note,item1,item2,item3,item4,item5};
            if (req.files['avatarimage']) {
                const avatarImage = req.files['avatarimage'][0];
                updateFields.avatar_url = avatarImage.filename; // Adjust field name based on your model
              }
              if (req.files['idcard']) {
                const idCard = req.files['idcard'][0];
                updateFields.idCard_url = idCard.filename; // Adjust field name based on your model
                updateFields.avatar_url = idCard.filename;
            }
            // console.log("customer file",updateFields)
           await Customer.update(updateFields, {
                where: {
                    id: req.body.id
                }
            })
            const customer = await Customer.findOne({
                where:{
                    id:req.body.id
                }
            });
            res.send(customer);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update customer information"
            })
        }
    },
    async editCardTypeCustomer(req, res) {
        try {
            // console.log("profile update",req.body)
            const id = req.body.id;
            const name = req.body.name;
            const value = req.body.value;
            const updateField = {};
            updateField[name] = value
            // console.log("customer file",updateFields)
           await Customer.update(updateField, {
                where: {
                    id: id
                }
            })
            const customer = await Customer.findAll();
            res.send(customer);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update customer information"
            })
        }
    },
    async createCustomerInvoice(req, res) {
        try {
            console.log("Customer update request received", req.body);
            
            const id = req.body.id;
            const {item1, item2, item3, item4, item5 } = req.body.customer;
            const invoiceIDs = req.body.invoiceIds;

            console.log('customerData',item1, item2, item3, item4, item5)
            const createFields = { item1, item2, item3, item4, item5 };
            delete createFields.id;
            Object.keys(createFields).forEach(key => {
                if (createFields[key] === undefined) {
                    delete createFields[key];
                }
            });
            createFields.item1 = (createFields.item1).toString();
            console.log("create fields:", createFields);
    
            const newCustomer = await Customer.update(createFields,{
                where:{
                    id:id
                }
            });

            const updateField = {};
            updateField.customer_id = id;
            for (let index = 0; index < invoiceIDs.length; index++) {
                const element = invoiceIDs[index];
                await Master.update(updateField,{
                    where: {
                        id:element
                    }
                });
            }

            console.log('newCustomer',newCustomer)
            res.send(newCustomer);
        } catch (err) {
            console.error("Error updating customer:", err); // Log the error for debugging
            res.status(500).send({
                error: "An error occurred when trying to update customer information"
            });
        }
    },
    async updateCustomerInvoice(req, res) {
        try {
            console.log("Customer update request received", req.body);
    
            const { id, item1, item2, item3, item4, item5 } = req.body;
            if (!id) {
                return res.status(400).send({ error: "Customer ID is required" });
            }
    
            const updateFields = { item1, item2, item3, item4, item5 };
            Object.keys(updateFields).forEach(key => {
                if (updateFields[key] === undefined) {
                    delete updateFields[key];
                }
            });
            updateFields.item1 = (updateFields.item1).toString();
            console.log("Update fields:", updateFields);
    
            const [updated] = await Customer.update(updateFields, {
                where: { id }
            });
    
            if (updated) {
                res.send({ success: true });
            } else {
                res.status(404).send({ error: "Customer not found" });
            }
        } catch (err) {
            console.error("Error updating customer:", err); // Log the error for debugging
            res.status(500).send({
                error: "An error occurred when trying to update customer information"
            });
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
       
        const { name, address, tel ,birthday} = req.body.params;
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
            if (birthday!='') {
                whereClause.push ({
                    birthday: { [Op.like]: `%${birthday}%` } 
               });
            }
            // console.log('ccc',whereClause.length)
            // console.log('ccc',whereClause)
            if(whereClause.length!=0){
                const customers = await Customer.findAll({
                    where: {
                        [Op.and]: whereClause
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
            const customerpastvisithistory = await CustomerPastVisitHistory.findAll({
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
                const {item1,item2,item3} = req.body;
                const updatedfield = {item1,item2,item3};
                // console.log('received information',customerId,updatedfield,req.body);
                await Customer.update(
                    updatedfield, 
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