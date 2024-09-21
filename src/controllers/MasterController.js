const { Sales } = require('../models')
const { Master } = require('../models')
const { Customer } = require('../models')
const {CustomerPastVisitHistory} = require('../models')
const { Vendor } = require('../models')
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
	async createSales(req, res) {
		try {
            const {trading_date,purchase_staff,customer_id,visit_type,brand_type,store_name,product_type_one,product_type_two,product,quantity,metal_type,price_per_gram,purchase_price, sales_amount, shipping_cost,wholesale_buyer,wholesale_date,payment_date} = req.body;
            const salesContents = {trading_date,purchase_staff,customer_id,visit_type,brand_type,store_name,product_type_one,product_type_two,product,quantity,metal_type,price_per_gram,purchase_price, sales_amount, shipping_cost,wholesale_buyer,wholesale_date,payment_date};
            salesContents.gross_profit = sales_amount - (purchase_price - shipping_cost);
            console.log("hello",salesContents);
			const sales = await Sales.create(salesContents);
			res.send({"success":true})
		} catch (err) {
			res.status(500).send({
				error: "An error occured when trying to create a sale."
			})
		}
	},
    async getSalesList(req, res) {
        try {
            const salesList = await Master.findAll({
                include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address','visit_type','brand_type'] // Specify the attributes you want to include
                    }
                ]
            });
                // console.log(JSON.stringify(salesWithCustomer, null, 2));
            console.log('saleList',salesList);
            res.send(salesList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async getSalesFilter(req, res) {
        const value = req.body.value;
        // console.log('zxczxczcx',value)
        try {
            const salesWithCustomer = await Master.findAll({
                include: [
                {
                    model: Customer,
                    attributes: ['full_name', 'phone_number','katakana_name','address'] // Specify the attributes you want to include
                }
                ],
                where:  {
                    [Op.or]:{product_type_one: { [Op.like]: `%${value}%` } }
                }
            });
            // console.log('saleList',salesWithCustomer);
            res.send(salesWithCustomer);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateSales(req, res) {
        try {
            const {id,salesSlipData} = req.body;
            if(salesSlipData.product_type_one != '貴金属') {
                delete salesSlipData.metal_type;
                delete salesSlipData.price_per_gram;
            }
            salesSlipData.gross_profit = salesSlipData.sales_amount - (salesSlipData.purchase_price - salesSlipData.shipping_cost);
            delete salesSlipData.id;
            // console.log("salesData",salesSlipData,id)

            await Master.update(salesSlipData, {
                where: {
                    id: id
                }
            })

            res.send({"success":true});
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update customer information"
            })
        }
    },
    async deleteSales(req, res) {
		try {
			const sales = await Sales.findByPk(req.params.salesId)
			if (!sales) {
				return res.status(403).send({
					error: 'No sales to delete.'
				})
			}
			await sales.destroy()
			res.send(sales)

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a sales.'
			})
		}
	},
    async getVendorList(req,res) {
        try {
            const type = req.body.type;
            console.log('getVendorList',type)
            const vendorList = await Vendor.findAll({
                attributes: ['vendor_name'],
                where: {[type]:'y'}
            });
            // console.log('vendorList',vendorList);
            res.send(vendorList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async getVendorListAll(req,res) {
        try {
            const vendorList = await Vendor.findAll({
                attributes: ['vendor_name']
            });
            // console.log('vendorList',vendorList);
            res.send(vendorList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async saveInvoice(req, res) {
		try {
            const {dataUrl,payload} = req.body;
            const purchaseData = payload;
            console.log("dataurl,purchaseData",purchaseData)

            if (!dataUrl) {
                return res.status(400).json({ error: 'No data URL provided' });
              }
            const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
            const thistime = Date.now();
            const dirPath = path.join(__dirname, '../uploads/signatures');
            const filename = `signature_${thistime}.png`;
            const filePath = path.join(dirPath, `${filename}`);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
              }
            
                // Save the file
            fs.writeFile(filePath, base64Data, 'base64', (err) => {
                if (err) {
                console.error('Error saving file:', err);
                return res.status(500).json({ error: 'Failed to save signature' });
                }
            });
            console.log('aa===========')
            try {
                for (let index = 0; index < purchaseData.length; index++) {
                    const masterData = purchaseData[index];
                    masterData.signature = filename;
                    delete masterData.id;
                    console.log('bb===============')
                    console.log("salesData",masterData)
                    const sales = await Master.create(masterData);
                    //save customer past visit history
                    const customerPastVisitHistory = {
                        visit_date: masterData.trading_date,
                        customerId: masterData.customer_id,
                        applicable: masterData.reason_application,
                        category:masterData.product_type_one,
                        product_name:masterData.product_name,
                        total_purchase_price:masterData.purchase_price,
                    };

                    const customerpastvistoryhistory = await CustomerPastVisitHistory.create(customerPastVisitHistory);
                }
                res.send({"success":true})
            } catch (err) {
                res.status(500).send({
                    error: "An error occured when trying to create a sale."
                })
            }

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a sales.'
			})
		}
	},
    async getSalesById(req,res) {
        try {
            const sales = await Master.findByPk(req.params.id)
                // console.log(JSON.stringify(salesWithCustomer, null, 2));
            // console.log('saleList',salesWithCustomer);
            res.send(sales);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
//-------------------------------------------------purchase request from for wholesalers-----------------------------------------

    async getSalesByIdForShipping(req,res) {
        try {
            const salesId = req.body.id;
            const sales = await Master.findByPk(salesId)
                // console.log(JSON.stringify(salesWithCustomer, null, 2));
            // console.log('saleList',salesWithCustomer);
            res.send(sales);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async savePurchaseRequestFromwholeSaler(req,res) {
        try {
            const {payload} = req.body;
           for (let index = 0; index < payload.length; index++) {
                const element = payload[index];
                const id = element.id;
                delete element.id;
                await Master.update(element, {
                    where: {
                        id: id
                    }
                })
           }
            res.send({'success':true});
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },

    async getWholeList(req, res) {
        const { shipping_date,shipping_address,product_status} = req.body.params;
        console.log("asd",req.body)
        try {
            const whereClause = [];

            if (shipping_address!='') {
                whereClause.push ({
                    shipping_address: { [Op.like]: `%${shipping_address}%` } 
               });
            }
            if (shipping_date!='') {
                whereClause.push ({
                    shipping_date: { [Op.like]: `%${shipping_date}%` } 
               });
            }
            if (product_status!='') {
                whereClause.push ({
                    product_status: { [Op.like]: `%${product_status}%` } 
               });
            }

            if(whereClause.length!=0){
                const salesList = await Master.findAll({
                    where: {
                        [Op.and]: [
                            ...whereClause,
                            { shipping_ids: { [Op.ne]: null } } // Add this condition
                        ]                
                    }
                });

                // console.log(customers)
                res.send(salesList);
            }else{
                const salesList = await Master.findAll();
                    // console.log(JSON.stringify(salesWithCustomer, null, 2));
                console.log('saleList',salesList);
                res.send(salesList);
            }
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
//---------------------------------------------yahooAcution-----------------------------------
    async getYahooAction(req,res) {
        try {
            const yahooacution = await Master.findAll({
                where: {
                    ヤフオク: {
                        [Op.ne]: null,    // Not NULL
                        [Op.ne]: '',      // Not empty string
                    }
                }
            });
            // console.log('vendorList',vendorList);
            res.send(yahooacution);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
//----------------------------------sales table--------------------search----------
    async getSalesListBySearch(req, res) {
        const { trading_date, purchase_staff, shipping_address ,visit_type ,product_type_one ,product_type_two ,shipping_date, deposite_date} = req.body.params;
        console.log("asd",req.body)
        try {
            const whereClause = [];

            if (trading_date!='') {
                whereClause.push ({
                     trading_date: { [Op.like]: `%${trading_date}%` } 
                });
            }
            if (purchase_staff!='') {
                whereClause.push ({
                    purchase_staff: { [Op.like]: `%${purchase_staff}%` } 
               });
            }
            if (shipping_address!='') {
                whereClause.push ({
                    shipping_address: { [Op.like]: `%${shipping_address}%` } 
               });
            }
            if (product_type_one!='') {
                whereClause.push ({
                    product_type_one: { [Op.like]: `%${product_type_one}%` } 
               });
            }
            if (product_type_two!='') {
                whereClause.push ({
                    product_type_two: { [Op.like]: `%${product_type_two}%` } 
               });
            }
            if (shipping_date!='') {
                whereClause.push ({
                    shipping_date: { [Op.like]: `%${shipping_date}%` } 
               });
            }
            if (deposite_date!='') {
                whereClause.push ({
                    deposite_date: { [Op.like]: `%${deposite_date}%` } 
               });
            }
            if (visit_type!='') {
                whereClause.push ({
                    visit_type: { [Op.like]: `%${visit_type}%` } 
               });
            }

            if(whereClause.length!=0){
                const salesList = await Master.findAll({
                    include: [
                        {
                            model: Customer,
                            attributes: ['full_name', 'phone_number','katakana_name','address','visit_type','brand_type'] // Specify the attributes you want to include
                        }
                    ],
                    where: {
                        [Op.and]: whereClause
                    }
                });

                // console.log(customers)
                res.send(salesList);
            }else{
                const salesList = await Master.findAll({
                    include: [
                        {
                            model: Customer,
                            attributes: ['full_name', 'phone_number','katakana_name','address','visit_type','brand_type'] // Specify the attributes you want to include
                        }
                    ]
                });
                    // console.log(JSON.stringify(salesWithCustomer, null, 2));
                console.log('saleList',salesList);
                res.send(salesList);
            }
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },

}