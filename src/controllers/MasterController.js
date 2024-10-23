const { Sales } = require('../models')
const { Master } = require('../models')
const { Customer } = require('../models')
const {CustomerPastVisitHistory} = require('../models')
const { Vendor } = require('../models')
const { SafeMoney } = require('../models')
const { StampsTransaction } = require('../models')
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const { Op, fn, col } = require('sequelize');
const moment = require('moment-timezone'); // Ensure you have moment-timezone installed


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/product');
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
	async createSales(req, res) {
		try {
            const {trading_date,purchase_staff,customer_id,visit_type,brand_type,store_name,product_type_one,product_type_two,product,quantity,metal_type,price_per_gram,purchase_price, sales_amount, shipping_cost,wholesale_buyer,wholesale_date,payment_date} = req.body;
            const salesContents = {trading_date,purchase_staff,customer_id,visit_type,brand_type,store_name,product_type_one,product_type_two,product,quantity,metal_type,price_per_gram,purchase_price, sales_amount, shipping_cost,wholesale_buyer,wholesale_date,payment_date};
            salesContents.gross_profit = sales_amount - (purchase_price - shipping_cost);
            // console.log("hello",salesContents);
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
                ],
                order: [['createdAt', 'DESC']]
            });
                // console.log(JSON.stringify(salesWithCustomer, null, 2));
            // console.log('saleList',salesList);
            res.send(salesList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async getSalesListByCategory1(req, res) {
        const cat1 = req.body.cat1;
        try {
            const salesList = await Master.findAll({
                include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address','visit_type','brand_type'] // Specify the attributes you want to include
                    }
                ],
                where:  {
                    [Op.or]:{product_type_one: { [Op.like]: `%${cat1}%` } }
                },
                order: [['createdAt', 'DESC']]
            });
                // console.log(JSON.stringify(salesWithCustomer, null, 2));
            // console.log('saleList',salesList);
            res.send(salesList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async getSalesFilter(req, res) {
        const value = req.body.value;
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
                },
                order: [['createdAt', 'DESC']]
            });
            // console.log('saleList',salesWithCustomer);
            res.send(salesWithCustomer);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async getSalesFilterByDate(req, res) {
        const type = req.body.type;
        const date = req.body.date;
        const cat1 = req.body.cat1;
        if(type === '買取日') {
            try {
                const salesData = await Master.findAll({
                    include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address'] // Specify the attributes you want to include
                    }
                    ],
                    where:  {
                        [Op.or]:{trading_date: { [Op.like]: `%${date}%` } }
                    },
                    order: [['createdAt', 'DESC']]
                });
                // console.log('saleList',salesWithCustomer);
                res.send(salesData);
            } catch (err) {
                res.status(500).send({
                    error: "An error occured when trying to get sales list."
                })
            }
        }
        if(type === '卸日') {
            try {
                const salesData = await Master.findAll({
                    include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address'] // Specify the attributes you want to include
                    }
                    ],
                    where:  {
                        [Op.or]:{shipping_date: { [Op.like]: `%${date}%` } }
                    },
                    order: [['createdAt', 'DESC']]
                });
                // console.log('saleList',salesWithCustomer);
                res.send(salesData);
            } catch (err) {
                res.status(500).send({
                    error: "An error occured when trying to get sales list."
                })
            }
        }
        if(type === '入金日') {
            try {
                const salesData = await Master.findAll({
                    include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address'] // Specify the attributes you want to include
                    }
                    ],
                    where:  {
                        [Op.or]:{deposit_date: { [Op.like]: `%${date}%` } }
                    },
                    order: [['createdAt', 'DESC']]
                });
                // console.log('saleList',salesWithCustomer);
                res.send(salesData);
            } catch (err) {
                res.status(500).send({
                    error: "An error occured when trying to get sales list."
                })
            }
        }

    },
    async getSalesFilterByPeriod(req, res) {
        const type = req.body.type;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const cat1 = req.body.cat1;
        if(type === '買取日') {
            try {
                const salesData = await Master.findAll({
                    include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address'] // Specify the attributes you want to include
                    }
                    ],
                    where: {
                        trading_date: {
                            [Op.between]: [startDate, endDate] // Date range filter
                        },
                    },
                    order: [['createdAt', 'DESC']]
                });
                // console.log('saleList',salesWithCustomer);
                res.send(salesData);
            } catch (err) {
                res.status(500).send({
                    error: "An error occured when trying to get sales list."
                })
            }
        }
        if(type === '卸日') {
            try {
                const salesData = await Master.findAll({
                    include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address'] // Specify the attributes you want to include
                    }
                    ],
                    where: {
                        shipping_date: {
                            [Op.between]: [startDate, endDate] // Date range filter
                        },
                    },
                    order: [['createdAt', 'DESC']]
                });
                // console.log('saleList',salesWithCustomer);
                res.send(salesData);
            } catch (err) {
                res.status(500).send({
                    error: "An error occured when trying to get sales list."
                })
            }
        }
        if(type === '入金日') {
            try {
                const salesData = await Master.findAll({
                    include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address'] // Specify the attributes you want to include
                    }
                    ],
                    where: {
                        deposit_date: {
                            [Op.between]: [startDate, endDate] // Date range filter
                        },
                    },
                    order: [['createdAt', 'DESC']]
                });
                // console.log('saleList',salesWithCustomer);
                res.send(salesData);
            } catch (err) {
                res.status(500).send({
                    error: "An error occured when trying to get sales list."
                })
            }
        }

    },
    async getSalesVendorFilter(req, res) {
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
                    [Op.or]:{shipping_address: { [Op.like]: `%${value}%` } }
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

            const now = new Date();
            // Format the date as YYYY-MM-DD
            const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
            const currentDay = new Intl.DateTimeFormat('ja-JP', optionsDate).format(now).replace(/\//g, '-');

            const {id,salesSlipData} = req.body;
            if(salesSlipData.product_type_one != '貴金属') {
                delete salesSlipData.metal_type;
                delete salesSlipData.price_per_gram;
            }
            if(salesSlipData.sales_amount !== null && salesSlipData.sales_amount !== '') {
                salesSlipData.gross_profit = salesSlipData.sales_amount - (salesSlipData.purchase_price - salesSlipData.shipping_cost);
                salesSlipData.product_status = '約定済';
                delete salesSlipData.id;
                //console.log("salesData",salesSlipData,id)
                await Master.update(salesSlipData, {
                    where: {
                        id: id
                    }
                })

                //----------save at Monthly income table 
                let todaySales_amount = await SafeMoney.findOne({
                    where: {
                    store_name:salesSlipData.store_name,
                    date: currentDay,
                    }
                });
                // console.log('workingTimeRecord',workingTimeRecord)
                if (todaySales_amount === null) {
                    // console.log()
                    await SafeMoney.create({
                    date:currentDay,
                    sales_balance:salesSlipData.sales_amount,
                    store_name:salesSlipData.store_name
                    });
                } else {
                    const totalAmount = parseFloat(todaySales_amount.sales_balance) + parseFloat(salesSlipData.sales_amount);
                    await SafeMoney.update(
                        {sales_balance:totalAmount},
                        { where: {
                            store_name: salesSlipData.store_name,
                        date:currentDay,
                        }}
                    );
                }
                //----------
            }

            res.send({"success":true});
    },
    async editSales(req, res) {
        try {
            //console.log('id name vlaue')
            const id = req.body.id;
            const name = req.body.name;
            const value = req.body.value;
            const cat1 = req.body.cat1;
            //console.log('id name vlaue',id,name,value)
            const updateField = {};
            updateField[name] = value;
            const maxWakabaNumber = await Master.max('wakaba_number');
            if(name === 'product_status' && value === '買取済' ) {
                if(maxWakabaNumber === null){
                    updateField.wakaba_number = '0';
                } else {
                    updateField.wakaba_number = (parseInt(maxWakabaNumber) + 1).toString();
                } 
            }
           // console.log('updateField',updateField)
            await Master.update(updateField,{
                where: {
                    id:id,
                }
            });
            const salesList = await Master.findAll({
                include: [
                    {
                        model: Customer,
                        attributes: ['full_name', 'phone_number','katakana_name','address','visit_type','brand_type'] // Specify the attributes you want to include
                    }
                ],
                where:  {
                    [Op.or]:{product_type_one: { [Op.like]: `%${cat1}%` } }
                },
                order: [['createdAt', 'DESC']]
            });
                // console.log(JSON.stringify(salesWithCustomer, null, 2));
            console.log('saleList',salesList,cat1);
            res.send(salesList);
          } catch (error) {
            res.status(500).send(error.message);
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
            const categoryId = req.body.id;
            const vendorList = await Vendor.findAll({
                where: {
                    categoryIds: {
                        [Op.or]: [
                            { [Op.like]: `${categoryId},%` },    
                            { [Op.like]: `%,${categoryId},%` },  
                            { [Op.like]: `%,${categoryId}` },    
                            { [Op.eq]: categoryId.toString() }    
                        ]
                    }
                }
            });
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
    async getVendorListSelected(req,res) {
        try {
            const payload = req.body.payload;
            for (let index = 0; index < payload.length; index++) {
                const element = payload[index];
                
                const vendorList = await Vendor.findAll({
                    attributes: ['vendor_name','cateagoryIds'],
                    where:{
                        categoryIds: {
                            [Op.or]: [
                                { [Op.like]: `${categoryId},%` },    
                                { [Op.like]: `%, ${categoryId},%` },  
                                { [Op.like]: `%, ${categoryId}` },    
                                { [Op.eq]: categoryId.toString() }    
                            ]
                        }
                    }
                });
                
            }
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
            console.log('------------saveinvoice------------')
            const {dataUrl,payload} = req.body;
            const purchaseData = payload;
            // console.log("dataurl,purchaseData",purchaseData)

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
            // console.log('aa===========')
            try {
                for (let index = 0; index < purchaseData.length; index++) {
                    const masterData = purchaseData[index];
                    masterData.signature = filename;
                    const id = masterData.id;
                    delete masterData.id;
                    // console.log('bb===============')
                    // console.log("salesData",masterData)
                    const updateField = {};
                    updateField.product_status = '買取済';
                    await Master.update(updateField,{
                        where:{
                            id:id
                        }
                    });
                    //----------save at Monthly income table-------------------------------- 
                    const now = new Date();
                    // Format the date as YYYY-MM-DD
                    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
                    const currentDay = new Intl.DateTimeFormat('ja-JP', optionsDate).format(now).replace(/\//g, '-');
            
                    // Format the time as HH:mm:ss
                    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Tokyo' };
                    const currentTime = new Intl.DateTimeFormat('ja-JP', optionsTime).format(now);
            
                    let todayPurchase_amount = await SafeMoney.findOne({
                        where: {
                        store_name:masterData.store_name,
                        date: currentDay,
                        }
                    });
                    // console.log('workingTimeRecord',workingTimeRecord)
                    if (todayPurchase_amount === null) {
                        // console.log()
                        await SafeMoney.create({
                        date:currentDay,
                        total_purchase_price:masterData.purchase_price,
                        store_name:masterData.store_name
                        });
                    } else {
                        const totalPurchaseAmount = parseFloat(todayPurchase_amount.total_purchase_price) + parseFloat(masterData.purchase_price);
                        await SafeMoney.update(
                            {total_purchase_price:totalPurchaseAmount},
                            { where: {
                                store_name: masterData.store_name,
                            date:currentDay,
                            }}
                        );
                    }
                    //-------------------------------------------
                    //save customer past visit history--------------
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
                //-------------------------------------------------------
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
//----------------------------------------------purchase invoice ---------------------------------------------------------------
async createInvoice(req, res) {
    try {
        const userStoreName = req.body.userStoreName;
        const {trading_date,number,purchase_staff,purchase_staff_id,customer_id,store_name,product_type_one,product_type_two,product_type_three,product_type_four,product_name,
            comment,quantity,reason_application,interest_rate,product_price,highest_estimate_vendor,highest_estimate_price,number_of_vendor,supervisor_direction,
            purchase_result,purchase_price,estimate_wholesaler,invoiceID} = req.body;

        const createData = {trading_date,number,purchase_staff,purchase_staff_id,customer_id,store_name,product_type_one,product_type_two,product_type_three,product_type_four,product_name,
            comment,quantity,reason_application,interest_rate,product_price,highest_estimate_vendor,highest_estimate_price,number_of_vendor,supervisor_direction,
            purchase_result,purchase_price,estimate_wholesaler,invoiceID};
    
        if (req.files['product_photo']) {
            const uploadfile = req.files['product_photo'][0];
            createData.product_photo = uploadfile.filename; // Adjust field name based on your model
          }

          if(product_type_one === '古銭等' || product_type_one === '洋酒' || product_type_one === 'カメラ'
            || product_type_one === '楽器' || product_type_one === 'スマホタブレット' || product_type_one === '着物'
          ) {
            createData.shipping_address = 'オークション';
          }
        Object.keys(createData).forEach(key => {
            if (createData[key] === 'null' || createData[key] === 'undefined') {
                delete createData[key];
            }
        });
        //console.log('createData------',createData)
       await Master.create(createData);
       const invoiceData = await Master.findAll({
            where: {
                // product_status: {
                //     [Op.or]: ['査定中','お預かり']
                // },
                product_status:'査定中',
                store_name:userStoreName,
                customer_id:createData.customer_id,
                purchase_staff_id:createData.purchase_staff_id
            }
       });
        //console.log('dafasfasd',invoiceData);
        res.send(invoiceData);
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async updateInvoice(req, res) {
    try {
        console.log(req.body)
        const id = req.body.id;
        const userStoreName = req.body.userStoreName;
        const {trading_date,number,purchase_staff,purchase_staff_id,customer_id,store_name,hearing,product_type_one,product_type_two,product_type_three,product_type_four,product_name,
            comment,quantity,reason_application,interest_rate,product_price,highest_estimate_vendor,highest_estimate_price,number_of_vendor,supervisor_direction,
            purchase_result,purchase_price,estimate_wholesaler,gold_type,gross_weight, price_gram, action_type, movable, tester,model_number_one, box_guarantee,rank,brand, capacity,
            percent, notes,} = req.body;

        const updateData = {trading_date,number,purchase_staff,purchase_staff_id,customer_id,store_name,hearing,product_type_one,product_type_two,product_type_three,product_type_four,product_name,
            comment,quantity,reason_application,interest_rate,product_price,highest_estimate_vendor,highest_estimate_price,number_of_vendor,supervisor_direction,
            purchase_result,purchase_price,estimate_wholesaler,gold_type,gross_weight, price_gram, action_type, movable, tester,model_number_one, box_guarantee,rank,brand, capacity,
            percent, notes,};
    
        if (req.files['product_photo']) {
            const uploadfile = req.files['product_photo'][0];
            updateData.product_photo = uploadfile.filename; // Adjust field name based on your model
          }
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === 'null'|| updateData[key] === 'undefined') {
                delete updateData[key];
            }
        });

        if(product_type_one === '古銭等' || product_type_one === '洋酒' || product_type_one === 'カメラ'
            || product_type_one === '楽器' || product_type_one === 'スマホタブレット' || product_type_one === '着物'
          ) {
            updateData.shipping_address = 'オークション';
          }

        //console.log('updateData',updateData,id)
       await Master.update(updateData,{
            where: {
                id:id
            }
       });
       const invoiceData = await Master.findAll({
            where: {
                // product_status: {
                //     [Op.or]: ['査定中','お預かり']
                // },
                product_status:'査定中',
                store_name:userStoreName,
                customer_id:updateData.customer_id,
                purchase_staff_id:updateData.purchase_staff_id
            }
       });
        // const newMessageContent = await TodoMessage.findAll();
        res.send(invoiceData);
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async deleteInvoice(req,res) {
        //console.log('deleteinvoice')
        const id = req.body.id;
        const userStoreName = req.body.userStoreName;
        const userId = req.body.userId;
        const customerId = req.body.customerId;
        //console.log('deleteinvoice',id,customerId)
        await Master.destroy({
            where: {
                id:id
            }
        });
       const invoiceData = await Master.findAll({
            where: {
                // product_status: {
                //     [Op.or]: ['査定中', 'お預かり']
                // },
                product_status:'査定中',
                store_name: userStoreName,
                purchase_staff_id: userId,
                customer_id:customerId,
            }
        });
        res.send(invoiceData);
},
async getRegisteredData(req,res) {
    try {
        const customerId = req.body.id;
        const userId = req.body.userId;
        const userStoreName = req.body.userStoreName;
        //console.log('aaaaaa',customerId,userId,userStoreName)
       const invoiceData = await Master.findAll({
            where: {
                product_status: {
                    [Op.or]: ['査定中']
                },
                customer_id:customerId,
                purchase_staff_id:userId,
                store_name:userStoreName
            }
       });
        // const newMessageContent = await TodoMessage.findAll();
        res.send(invoiceData);
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async allInvoiceClear(req,res) {
    try {
        //console.log('deleteinvoice')
        const payload = req.body.payload;
        //console.log('payload',payload)
        for (let index = 0; index < payload.length; index++) {
            const element = payload[index];
            id = element.id;
            await Master.destroy({
                where: {
                    id:id
                }
            });
        }
        res.send({success:true});
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async commentSave(req,res) {
    try {
        const payload = req.body.payload;
        const id = payload.id;
        const userId = req.body.userId;
        const userStoreName = req.body.userStoreName;
        const comment = req.body.commentData;
        const customer_id = payload.customer_id;
        const updateField = {};
        updateField.comment = comment;
        await Master.update(updateField,{
            where: {
                id:id
            }
        });
       const invoiceData = await Master.findAll({
            where: {
                // product_status: {
                //     [Op.or]: ['査定中','お預かり']
                // },
                product_status:'査定中',
                store_name:userStoreName,
                purchase_staff_id: userId,
                customer_id:customer_id
            }
        });
        res.send(invoiceData);
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async uploadItemsImage(req,res) {
    try {
        const {ids,customer_id,purchase_staff_id,store_name} = req.body;
        const updateField = {};
        if (req.files['entire_items_url']) {
            const uploadfile = req.files['entire_items_url'][0];
            updateField.entire_items_url = uploadfile.filename; // Adjust field name based on your model
          }
        if (req.files['document_url']) {
            const uploadfile = req.files['document_url'][0];
            updateField.document_url = uploadfile.filename; // Adjust field name based on your model
          }
          
          const itemIds = ids.split(',').map(Number);
          //console.log('-------------updateField',updateField,itemIds.length)
        for (let index = 0; index < itemIds.length; index++) {
            const element = itemIds[index];
           // console.log(element)
            await Master.update(updateField,{
                where: {
                    id:element
                }
            });
        }

       const invoiceData = await Master.findAll({
            where: {
                product_status:'査定中',
                store_name:store_name,
                purchase_staff_id: purchase_staff_id,
                customer_id:customer_id
            }
        });
        res.send(invoiceData);
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async changePurchasePaymentStaff(req,res) {
    try {
        const {payload} = req.body;
        const customer_id = payload[0].customer_id;
        const purchase_staff_id = payload[0].purchase_staff_id;
        const store_name = payload[0].store_name;
       for (let index = 0; index < payload.length; index++) {
            const element = payload[index];
            const updateField = {};
            if(element.purchase_staff !== null) {
                updateField.purchase_staff = element.purchase_staff;
            }
            if(element.payment_staff !== null) {
                updateField.payment_staff = element.payment_staff;
            }
            const id = element.id;
            delete element.id;
            //console.log('payload',updateField,id)
            await Master.update(updateField, {
                where: {
                    id: id
                }
            })
       }
       //console.log('success',customer_id,store_name,purchase_staff_id)
       const invoiceData = await Master.findAll({
        where: {
            product_status:'査定中',
            store_name:store_name,
            purchase_staff_id: purchase_staff_id,
            customer_id:customer_id
        }
    });
    //console.log('updatedata',invoiceData)
    res.send(invoiceData);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
async purchasePermissionWaiting(req,res) {
    try {
        const ids = req.body.ids;
        const updateField = {};
        updateField.product_status = '承認待ち';
        for (let index = 0; index < ids.length; index++) {
            const element = ids[index];
            await Master.update(updateField,{
                where: {
                    id:element
                }
            });
        }
        updateField.invoice_ids = ids.toString();
        await Master.update(updateField,{
            where: {
                id:ids[0]
            }
        });
       const invoiceData = await Master.findAll({
            where: {
                id:ids
            }
       });
        // const newMessageContent = await TodoMessage.findAll();
        res.send(invoiceData);
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async purchasePermission(req,res) {
    try {
        const ids = req.body.ids;
        const customerId = req.body.id;
        const userId = req.body.userId;
        const userStoreName = req.body.userStoreName;
        const updateField = {};
        updateField.product_status = '承認された';
        for (let index = 0; index < ids.length; index++) {
            const element = ids[index];
           // console.log('updateField',updateField.wakana_number);
            await Master.update(updateField,{
                where: {
                    id:element
                }
            });
        }
        updateField.invoice_ids = ids.toString();
        await Master.update(updateField,{
            where: {
                id:ids[0]
            }
        });
       const invoiceData = await Master.findAll({
            where: {
                id:ids
            }
       });
        // const newMessageContent = await TodoMessage.findAll();
        res.send(invoiceData);
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async purchaseReceiptPermit(req,res) {
    try {
        const ids = req.body.ids;
        const updateField = {};
        updateField.product_status = 'お預かり';
        updateField.customer_receipt = '1';
        // console.log('bbbbbb',customerId,userId,userStoreName,ids.length)
        for (let index = 0; index < ids.length; index++) {
            const element = ids[index];
            await Master.update(updateField,{
                where: {
                    id:element
                }
            });
        }
        updateField.invoice_ids = ids.toString();
        await Master.update(updateField,{
            where: {
                id:ids[0]
            }
        });
        // const newMessageContent = await TodoMessage.findAll();
        res.send({success:true});
      } catch (error) {
        res.status(500).send(error.message);
      }
},
async purchaseStamp(req,res){
    try {

        const {currentDay,customerId,username,storeName,userId,stampRate,
            sheetIds,sheetValues,roseIds,roseValues,packIds,packValues,cardIds,cardValues,
            totalNumberOfSheet1,totalNumberOfSheet2,totalNumberOfRose1,totalNumberOfRose2,totalNumberOfPack1,totalNumberOfPack2,totalNumberOfCard1,totalNumberOfCard2,
            totalFaceValue1,totalFaceValue2,totalRoseFaceValue1,totalRoseFaceValue2,totalPackFaceValue1,totalPackFaceValue2,totalCardFaceValue1,totalCardFaceValue2,
            totalPurchaseOfSheet1,totalPurchaseOfSheet2,totalPurchaseOfRose1,totalPurchaseOfRose2,totalPurchaseOfPack1,totalPurchaseOfPack2,totalPurchaseOfCard1,totalPurchaseOfCard2,
        } = req.body;
        const aaa = {currentDay,customerId,username,storeName,userId,stampRate,
            sheetIds,sheetValues,roseIds,roseValues,packIds,packValues,cardIds,cardValues,
            totalNumberOfSheet1,totalNumberOfSheet2,totalNumberOfRose1,totalNumberOfRose2,totalNumberOfPack1,totalNumberOfPack2,totalNumberOfCard1,totalNumberOfCard2,
            totalFaceValue1,totalFaceValue2,totalRoseFaceValue1,totalRoseFaceValue2,totalPackFaceValue1,totalPackFaceValue2,totalCardFaceValue1,totalCardFaceValue2,
            totalPurchaseOfSheet1,totalPurchaseOfSheet2,totalPurchaseOfRose1,totalPurchaseOfRose2,totalPurchaseOfPack1,totalPurchaseOfPack2,totalPurchaseOfCard1,totalPurchaseOfCard2,
        }
        //  console.log('=======arrive==========',aaa)
        if(sheetIds.length !== 0) {
            // console.log('====');
            const createData = {};
            createData.date = currentDay;
            createData.in_charge = username;
            createData.inorout = '人庫';
            createData.stamp_type = '切手シート';
            createData.stamp_ids = sheetIds.toString();
            createData.stamp_numbers = sheetValues.toString();
            createData.totalFaceValue = (Number(totalFaceValue1) + Number(totalFaceValue2)).toString();
            createData.five_up_facevalue = totalFaceValue1;
            createData.five_down_facevalue = totalFaceValue2;
            createData.in_charge_id = userId;
            createData.store_name = storeName;
            await StampsTransaction.create(createData);
            //console.log('stampOk1')

            if(totalFaceValue1 !== 0 || totalFaceValue2 !== 0) {
                const createInvoiceData = {};
                createInvoiceData.trading_date = currentDay;
                createInvoiceData.purchase_staff = username;
                createInvoiceData.purchase_staff_id = userId;
                createInvoiceData.customer_id = customerId;
                createInvoiceData.store_name = storeName;
                createInvoiceData.product_type_one = '切手';
                createInvoiceData.interest_rate = (stampRate[0].percent).toString();
                createInvoiceData.product_price = (parseInt(totalFaceValue1) + parseInt(totalFaceValue2)).toString();
                createInvoiceData.purchase_price = (parseInt(totalPurchaseOfSheet1) + parseInt(totalPurchaseOfSheet2)).toString();

                createInvoiceData.quantity = (parseInt(totalNumberOfSheet1) + parseInt(totalNumberOfSheet2)).toString();
                createInvoiceData.number = '';
                createInvoiceData.estimate_wholesaler = '{}';
                createInvoiceData.hearing = '';
                createInvoiceData.product_type_three = '';
                createInvoiceData.product_type_four = '';
                createInvoiceData.product_name = '';
                createInvoiceData.reason_application = '';
                createInvoiceData.highest_estimate_vendor = '';
                createInvoiceData.highest_estimate_price = '0';
                createInvoiceData.number_of_vendor = '';
                createInvoiceData.supervisor_direction = '';
                createInvoiceData.purchase_result = '';
                //console.log('stampOk2',createInvoiceData)
                await Master.create(createInvoiceData);
            }

        }
        if(roseIds.length !== 0) {
            // console.log('====');
            const createData = {};
            createData.date = currentDay;
            createData.in_charge = username;
            createData.inorout = '人庫';
            createData.stamp_type = '切手バラ';
            createData.stamp_ids = roseIds.toString();
            createData.stamp_numbers = roseValues.toString();
            createData.totalFaceValue = Number(totalRoseFaceValue1) + Number(totalRoseFaceValue2);
            createData.five_up_facevalue = Number(totalRoseFaceValue1);
            createData.five_down_facevalue = Number(totalRoseFaceValue2);
            createData.in_charge_id = userId;
            createData.store_name = storeName;
            // console.log('====',createData);
            await StampsTransaction.create(createData);

            if(totalRoseFaceValue1 !== 0 || totalRoseFaceValue2 !== 0) {
                const createInvoiceData = {};
                createInvoiceData.trading_date = currentDay;
                createInvoiceData.purchase_staff = username;
                createInvoiceData.purchase_staff_id = userId;
                createInvoiceData.customer_id = customerId;
                createInvoiceData.store_name = storeName;
                createInvoiceData.product_type_one = '切手';
                createInvoiceData.interest_rate = (stampRate[1].percent).toString();
                createInvoiceData.product_price = (parseInt(totalRoseFaceValue1) + parseInt(totalRoseFaceValue2)).toString();
                createInvoiceData.purchase_price = (parseInt(totalPurchaseOfRose1) + parseInt(totalPurchaseOfRose2)).toString();

                createInvoiceData.quantity = (parseInt(totalNumberOfRose1) + parseInt(totalNumberOfRose2)).toString();
                createInvoiceData.number = '';
                createInvoiceData.estimate_wholesaler = '{}';
                createInvoiceData.hearing = '';
                createInvoiceData.product_type_three = '';
                createInvoiceData.product_type_four = '';
                createInvoiceData.product_name = '';
                createInvoiceData.reason_application = '';
                createInvoiceData.highest_estimate_vendor = '';
                createInvoiceData.highest_estimate_price = '0';
                createInvoiceData.number_of_vendor = '';
                createInvoiceData.supervisor_direction = '';
                createInvoiceData.purchase_result = '';

                await Master.create(createInvoiceData);
            }
        }
        if(packIds.length !== 0) {
            // console.log('====');
            const createData = {};
            createData.date = currentDay;
            createData.in_charge = username;
            createData.inorout = '人庫';
            createData.stamp_type = 'レ夕一パック';
            createData.stamp_ids = packIds.toString();
            createData.stamp_numbers = packValues.toString();
            createData.totalFaceValue = Number(totalPackFaceValue1) + Number(totalPackFaceValue2);
            createData.five_up_facevalue = Number(totalPackFaceValue1);
            createData.five_down_facevalue = Number(totalPackFaceValue2);
            createData.in_charge_id = userId;
            createData.store_name = storeName;
            // console.log('====',createData);
            await StampsTransaction.create(createData);

            if(totalPackFaceValue1 !== 0 || totalPackFaceValue2 !== 0) {
                const createInvoiceData = {};
                createInvoiceData.trading_date = currentDay;
                createInvoiceData.purchase_staff = username;
                createInvoiceData.purchase_staff_id = userId;
                createInvoiceData.customer_id = customerId;
                createInvoiceData.store_name = storeName;
                createInvoiceData.product_type_one = '切手';
                createInvoiceData.interest_rate = (stampRate[2].percent).toString();
                createInvoiceData.product_price = (parseInt(totalPackFaceValue1) + parseInt(totalPackFaceValue2)).toString();
                createInvoiceData.purchase_price = (parseInt(totalPurchaseOfPack1) + parseInt(totalPurchaseOfPack2)).toString();

                createInvoiceData.quantity = (parseInt(totalNumberOfPack1) + parseInt(totalNumberOfPack2)).toString();
                createInvoiceData.number = '';
                createInvoiceData.estimate_wholesaler = '{}';
                createInvoiceData.hearing = '';
                createInvoiceData.product_type_three = '';
                createInvoiceData.product_type_four = '';
                createInvoiceData.product_name = '';
                createInvoiceData.reason_application = '';
                createInvoiceData.highest_estimate_vendor = '';
                createInvoiceData.highest_estimate_price = '0';
                createInvoiceData.number_of_vendor = '';
                createInvoiceData.supervisor_direction = '';
                createInvoiceData.purchase_result = '';

                await Master.create(createInvoiceData);
            }
        }
        if(cardIds.length !== 0) {
            // console.log('====');
            const createData = {};
            createData.date = currentDay;
            createData.in_charge = username;
            createData.inorout = '人庫';
            createData.stamp_type = 'レ夕一パック';
            createData.stamp_ids = cardIds.toString();
            createData.stamp_numbers = cardValues.toString();
            createData.totalFaceValue = Number(totalCardFaceValue1) + Number(totalCardFaceValue2);
            createData.five_up_facevalue = Number(totalCardFaceValue1);
            createData.five_down_facevalue = Number(totalCardFaceValue2);
            createData.in_charge_id = userId;
            createData.store_name = storeName;
            // console.log('====',createData);
            await StampsTransaction.create(createData);

            if(totalCardFaceValue1 !== 0 || totalCardFaceValue2 !== 0) {
                const createInvoiceData = {};
                createInvoiceData.trading_date = currentDay;
                createInvoiceData.purchase_staff = username;
                createInvoiceData.purchase_staff_id = userId;
                createInvoiceData.customer_id = customerId;
                createInvoiceData.store_name = storeName;
                createInvoiceData.product_type_one = '切手';

                createInvoiceData.interest_rate = (stampRate[3].percent).toString();
                createInvoiceData.product_price = (parseInt(totalCardFaceValue1) + parseInt(totalCardFaceValue2)).toString();
                createInvoiceData.purchase_price = (parseInt(totalPurchaseOfCard1) + parseInt(totalPurchaseOfCard2)).toString();

                createInvoiceData.quantity = (parseInt(totalNumberOfCard1) + parseInt(totalNumberOfCard2)).toString();
                createInvoiceData.number = '';
                createInvoiceData.estimate_wholesaler = '{}';
                createInvoiceData.hearing = '';
                createInvoiceData.product_type_three = '';
                createInvoiceData.product_type_four = '';
                createInvoiceData.product_name = '';
                createInvoiceData.reason_application = '';
                createInvoiceData.highest_estimate_vendor = '';
                createInvoiceData.highest_estimate_price = '0';
                createInvoiceData.number_of_vendor = '';
                createInvoiceData.supervisor_direction = '';
                createInvoiceData.purchase_result = '';

                await Master.create(createInvoiceData);
            }
        }
        res.send({success:true})
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to create a sale."
        })
    }
},
async getInvoiceList(req, res) {
    try {
        const userStoreName = req.body.userStoreName;
        const subQuery = await Master.findAll({
            attributes: [
                'invoiceID',
                [fn('MIN', col('id')), 'firstId'] // Get the minimum id
            ],
            where: {
                invoiceID: { [Op.ne]: null }
            },
            group: ['invoiceID'],
            raw: true // Get plain objects
        });
        
        // Extract the firstIds for the main query
        const firstIds = subQuery.map(item => item.firstId);
        
        // Main query to get all attributes for the first ids
        const salesList = await Master.findAll({
            include: [
                {
                    model: Customer,
                    attributes: ['full_name', 'phone_number','katakana_name','address','visit_type','brand_type'] // Specify the attributes you want to include
                }
            ],
            where: {
                id: { [Op.in]: firstIds }
            }
        });
        
        res.send(salesList);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
async getInvoiceDetail(req,res) {
    try {
        const invoiceId = req.body.id;
        const invoiceIds = await Master.findOne({
            where: {
              id: invoiceId // Assuming `id` is the primary key
            },
            attributes: ['invoice_ids'] // Replace with the name of the column you want to select
          });
          const invoiceids = invoiceIds.invoice_ids;
          if(invoiceids != null) {
            const ids = invoiceids.split(',').map(id => id.trim())
            const sales = await Master.findAll({
                where: {
                id: ids // Assuming `id` is the primary key
                },
            });
            res.send(sales);
          } else {
            //console.log('-0k2-')
            const sales = await Master.findAll({
                where: {
                  id: invoiceId // Assuming `id` is the primary key
                },
              });
              res.send(sales);
          }

    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
//by customer
async purchaseInvoiceConfirm (req,res) {
    try {
        const {dataUrl,payload} = req.body;
        const purchaseData = payload;
        //console.log("dataurl,purchaseData",purchaseData)

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
        // console.log('aa===========')
        const maxWakabaNumber = await Master.max('wakaba_number');
        if(maxWakabaNumber === null){
            updateField.wakaba_number = '0';
            maxWakabaNumber = 0;
        } 
       // console.log('maxWakabaNumber')
        //console.log('maxWakabaNumber',maxWakabaNumber)

        try {
            for (let index = 0; index < purchaseData.length; index++) {
                const masterData = purchaseData[index];
                masterData.signature = filename;
                const id = masterData.id;
                delete masterData.id;
               
                const updateField = {};
                updateField.product_status = '買取済';
                updateField.wakaba_number = (parseInt(maxWakabaNumber) + index + 1).toString();
                await Master.update(updateField,{
                    where:{
                        id:id
                    }
                });
                //----------save at Monthly income table-------------------------------- 
                const now = new Date();
                // Format the date as YYYY-MM-DD
                const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
                const currentDay = new Intl.DateTimeFormat('ja-JP', optionsDate).format(now).replace(/\//g, '-');
        
                // Format the time as HH:mm:ss
                const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Tokyo' };
                const currentTime = new Intl.DateTimeFormat('ja-JP', optionsTime).format(now);
        
                let todayPurchase_amount = await SafeMoney.findOne({
                    where: {
                    store_name:masterData.store_name,
                    date: currentDay,
                    }
                });
                // console.log('workingTimeRecord',workingTimeRecord)
                if (todayPurchase_amount === null) {
                    // console.log()
                    await SafeMoney.create({
                    date:currentDay,
                    total_purchase_price:masterData.purchase_price,
                    store_name:masterData.store_name
                    });
                } else {
                    const totalPurchaseAmount = parseFloat(todayPurchase_amount.total_purchase_price) + parseFloat(masterData.purchase_price);
                    await SafeMoney.update(
                        {total_purchase_price:totalPurchaseAmount},
                        { where: {
                            store_name: masterData.store_name,
                        date:currentDay,
                        }}
                    );
                }
                //-------------------------------------------
                //save customer past visit history--------------
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
            //----------------custoemr visit_number and last_visit_date 
                const customer = Customer.findOne({
                    where: {
                        id:purchaseData[0].customer_id
                    }
                });
                const updateCustomerField = {};
                updateCustomerField.visit_number = (parseInt(customer.visit_number) + 1).toString();
                const now = new Date();
                // Format the date as YYYY-MM-DD
                const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
                const currentDay = new Intl.DateTimeFormat('ja-JP', optionsDate).format(now).replace(/\//g, '-');
                updateCustomerField.last_visit_date = currentDay.toString();
                await Customer.update(updateCustomerField,
                    { where: {
                        id:purchaseData[0].customer_id
                    }}
                );
            //-------------------------------------------------------
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
async rShopShippingConfirm (req,res) {
    try {
        //console.log('hello')
        const ids = req.body.ids;
        const payload = req.body.payload;
        const updateField = {};
        updateField.product_status = '約定済';

        for (let index = 0; index < payload.length; index++) {
            const element = payload[index];
            updateField.shipping_address = element.shipping_address;
            updateField.sales_amount = element.sales_amount;
            await Master.update(updateField,{
                where: {
                    id:element.id
                }
            });
        }
        delete updateField.shipping_address;
        delete updateField.sales_amount;
        updateField.invoice_ids = ids.toString();
        await Master.update(updateField,{
            where: {
                id:ids[0]
            }
        });
        // const newMessageContent = await TodoMessage.findAll();
        res.send({success:true});
      } catch (error) {
        res.status(500).send(error.message);
      }
},
//get the invoice number
async getInvoiceNumber(req, res) {
    try {
        //console.log('------------------maxinvoiceNumber--------------------');
        let maxinvoiceNumber = await Master.max('invoiceID'); // Change const to let

        // Set to 1 if maxinvoiceNumber is null or 0
        if (maxinvoiceNumber === null || maxinvoiceNumber === 0) {
            maxinvoiceNumber = 1;
        } else {
            maxinvoiceNumber = parseInt(maxinvoiceNumber) + 1;
        }

        //console.log('------------------maxinvoiceNumber--------------------', maxinvoiceNumber);
        res.send({ invoiceID: maxinvoiceNumber });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send({
            error: "An error occurred when trying to get the invoice number."
        });
    }
},
//----------------------------------------------vendor assessment 
async getCategoryInitialData(req, res) {
    try {
        const category = req.body.category;
        // console.log('saleList',category);
        const salesList = await Master.findAll({
            where: {
                product_type_one: category,
                product_status: {
                    [Op.not]: ['査定中']
                },
            },
            order: [['createdAt', 'DESC']]
        });
        res.send(salesList);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
async getCategoryData(req, res) {
    try {
        const category = req.body.category;
        const salesList = await Master.findAll({
            where: {
                product_type_one: category,
                product_status: {
                    [Op.not]: ['査定中']
                } 
            },
            order: [['createdAt', 'DESC']]
        });
        res.send(salesList);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
async updateEstimate(req, res) {
    try {
        const id = req.body.id;
        const category = req.body.category;
        const payload = req.body.payload;
        const otherData = req.body.otherData;
        const updateField0 = otherData;
        delete updateField0.id;
        delete updateField0.estimate_wholesaler;
        await Master.update(updateField0,{
            where:{
                id:id
            }
        });
        //console.log('success')
        const updateField = {};
        updateField.estimate_wholesaler = payload;
        await Master.update(updateField,{
            where:{
                id:id
            }
        });
        const salesList = await Master.findAll({
            where: {
                product_type_one: category,
                product_status:'買取済',
            }
        });
        // console.log('saleList',salesList);
        res.send(salesList);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
//-------------------------------------------------purchase request from for wholesalers-----------------------------------------

    async getSalesByIdForShipping(req,res) {
        try {
 
            const ids = req.body.id;
            const sales = await Master.findAll({
                where: {
                  id: ids // This will retrieve records with matching IDs
                }
              });
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
                if(element.shipping_status === '発送中'){
                    element.product_status = '発送中';
                }
                if(element.shipping_status === '約定済'){
                    element.product_status = '約定済';
                }
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
        const { shipping_date,shipping_address,shipping_status} = req.body.params;
        const storeName = req.body.storeName;
        console.log('sfasfdasd',storeName)
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
            if (shipping_status!='') {
                whereClause.push ({
                    shipping_status: { [Op.like]: `%${shipping_status}%` } 
               });
            }

            if(whereClause.length!=0){
                const salesList = await Master.findAll({
                    where: {
                        [Op.and]: [
                            ...whereClause,
                            { shipping_ids: { [Op.ne]: '' } } // Add this condition
                        ],
                         store_name:storeName,          
                    },
                    order: [['createdAt', 'DESC']]
                });

                // console.log(customers)
                res.send(salesList);
            }else{
                const salesList = await Master.findAll({
                    where: {
                        [Op.and]: [
                            { shipping_ids: { [Op.ne]: '' } } // Add this condition
                        ],
                         store_name:storeName,              
                    },
                    order: [['createdAt', 'DESC']]
                });
                    // console.log(JSON.stringify(salesWithCustomer, null, 2));
                // console.log('saleList',salesList);
                res.send(salesList);
            }
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async getWholeSalerShippingSave(req, res) {
        const { shipping_date,shipping_address,shipping_status} = req.body.params;
        const storeName = req.body.storeName;
        const payload = req.body.payload;

        const updateField = {};
        const id = payload.id;
        updateField.expected_deposit_date = payload.expected_deposit_date;
        updateField.shipping_status = payload.shipping_status;
        if(payload.expected_deposit_date !== ''){
            updateField.shipping_status = '入金待ち'
        }
        updateField.deposit_date = payload.deposit_date;
        if(payload.deposit_date !== ''){
            updateField.shipping_status = '入金済'
        }
        updateField.sales_amount = payload.sales_amount;
        console.log('updatedField',updateField)
        await Master.update(updateField,{
            where:{
                id:id
            }
        });

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
            if (shipping_status!='') {
                whereClause.push ({
                    shipping_status: { [Op.like]: `%${shipping_status}%` } 
               });
            }

            if(whereClause.length!=0){
                const salesList = await Master.findAll({
                    where: {
                        [Op.and]: [
                            ...whereClause,
                            { shipping_ids: { [Op.ne]: '' } } // Add this condition
                        ],
                         store_name:storeName,          
                    },
                    order: [['createdAt', 'DESC']]
                });

                // console.log(customers)
                res.send(salesList);
            }else{
                const salesList = await Master.findAll({
                    where: {
                        [Op.and]: [
                            { shipping_ids: { [Op.ne]: '' } } // Add this condition
                        ],
                         store_name:storeName,              
                    },
                    order: [['createdAt', 'DESC']]
                });
                    // console.log(JSON.stringify(salesWithCustomer, null, 2));
                // console.log('saleList',salesList);
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
        // console.log("asd",req.body)
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
                // console.log('saleList',salesList);
                res.send(salesList);
            }
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
//------------------------------------OwnerTop-----------------------------
    async getOwnerTopData(req,res){
        // console.log('datas--------')
        const storeName = req.body.storeName;
            // Set timezone to Japan
        const startOfMonth = moment.tz('Asia/Tokyo').startOf('month').toDate();
        const endOfMonth = moment.tz('Asia/Tokyo').endOf('month').toDate();
        // console.log('datas--------',storeName,startOfMonth,endOfMonth)
        try {
            const metrics = await Master.findAll({
                attributes: [
                    [fn('COUNT', fn('DISTINCT', col('customer_id'))), 'customer_count'],
                    [fn('COUNT', fn('DISTINCT', col('product_name'))), 'product_count'],
                    [fn('SUM', col('gross_profit')), 'total_gross_profit'],
                    [fn('SUM', col('purchase_price')), 'total_purchase_price'],
                    [fn('SUM', col('sales_amount')), 'total_sales_amount'],
                    [col('store_name'), 'store_name'], // Include store name
                ],
                where: {                  
                    shipping_date: {
                        [Op.between]: [startOfMonth, endOfMonth],
                    },
                },
                group: ['store_name'],
                // limit: 1,
            });
            // console.log('metrics',metrics)
            res.send(metrics);
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get data."
            })
        }
    },    
    async getComprehensiveAnalysis(req,res){
        // console.log('datas--------')
        const storeName = req.body.storeName;
            // Set timezone to Japan
        const startOfMonth = moment.tz('Asia/Tokyo').startOf('month').toDate();
        const endOfMonth = moment.tz('Asia/Tokyo').endOf('month').toDate();
        // console.log('datas--------',storeName,startOfMonth,endOfMonth)
        try {
            const metrics = await Master.findAll({
                attributes: [
                    [fn('COUNT', fn('DISTINCT', col('customer_id'))), 'customer_count'],
                    [fn('COUNT', fn('DISTINCT', col('product_name'))), 'product_count'],
                    [fn('SUM', col('gross_profit')), 'total_gross_profit'],
                    [fn('SUM', col('purchase_price')), 'total_purchase_price'],
                    [fn('SUM', col('sales_amount')), 'total_sales_amount'],
                    [col('store_name'), 'store_name'], // Include store name
                ],
                where: {                  
                    shipping_date: {
                        [Op.between]: [startOfMonth, endOfMonth],
                    },
                },
                group: ['store_name'],
                // limit: 1,
            });
            // console.log('metrics',metrics)
            res.send(metrics);
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get data."
            })
        }
    },    
    async getiveAnalysisIndividualResult(req,res){
        // console.log('datas--------')
        const storeName = req.body.storeName;
            // Set timezone to Japan
        const startOfMonth = moment.tz('Asia/Tokyo').startOf('month').toDate();
        const endOfMonth = moment.tz('Asia/Tokyo').endOf('month').toDate();
        // console.log('datas--------',storeName,startOfMonth,endOfMonth)
        try {
            const metrics = await Master.findAll({
                attributes: [
                    [fn('COUNT', fn('DISTINCT', col('customer_id'))), 'customer_count'],
                    [fn('COUNT', fn('DISTINCT', col('product_name'))), 'product_count'],
                    [fn('SUM', col('gross_profit')), 'total_gross_profit'],
                    [fn('SUM', col('purchase_price')), 'total_purchase_price'],
                    [fn('SUM', col('sales_amount')), 'total_sales_amount'],
                    [col('store_name'), 'store_name'], // Include store name
                    [col('purchase_staff'), 'purchase_staff'], // Include store name
                ],
                where: {                  
                    shipping_date: {
                        [Op.between]: [startOfMonth, endOfMonth],
                    },
                    store_name:storeName
                },
                group: ['purchase_staff'],
                // limit: 1,
            });
            // console.log('metrics',metrics)
            res.send(metrics);
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get data."
            })
        }
    },  

   upload
}