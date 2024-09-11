const { Sales } = require('../models')
const { Customer } = require('../models')
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
            // const sales = await Sales.create({
            //     trading_date: '2024-09-10',
            //     purchase_staff: '中村 亮', // Nakamura Ryo
            //     customer_id: 6,
            //     visit_type: '初回訪問', // First Visit
            //     brand_type: 'ブランドF', // Brand F
            //     store_name: '札幌店', // Sapporo Store
            //     product_type_one: 'カメラ', // Cameras
            //     product_type_two: '色石', // Colored Stones
            //     product: 'デジタル一眼レフカメラ', // Digital SLR Camera
            //     quantity: 1,
            //     metal_type: 'なし', // None
            //     price_per_gram: 0.00, // Not applicable
            //     purchase_price: 150000.00,
            //     sales_amount: 220000.00,
            //     shipping_cost: 3500.00,
            //     gross_profit: 66500.00, // sales_amount - (purchase_price + shipping_cost)
            //     wholesale_buyer: '小林商事', // Kobayashi Trading
            //     wholesale_date: '2024-09-08',
            //     payment_date: '2024-09-15'
            // });
            // const salesList = await Sales.findAll()
            const salesWithCustomer = await Sales.findAll({
                include: [
                {
                    model: Customer,
                    attributes: ['full_name', 'phone_number','katakana_name','address'] // Specify the attributes you want to include
                }
                ]
            });
                // console.log(JSON.stringify(salesWithCustomer, null, 2));
            // console.log('saleList',salesWithCustomer);
            res.send(salesWithCustomer);
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
            const salesWithCustomer = await Sales.findAll({
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
            console.log('saleList',salesWithCustomer);
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
            console.log("salesData",salesSlipData,id)

            await Sales.update(salesSlipData, {
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
    async saveInvoice(req, res) {
		try {
            const {dataUrl,payload} = req.body;
            const purchaseData = payload;
            // console.log("dataurl,purchaseData",dataUrl,purchaseData)

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

            try {
                for (let index = 0; index < purchaseData.length; index++) {
                    // const {customer_id, visit_type, brand_type, trading_date, purchase_staff, store_name, product_type_one, product_type_two, metal_type, price_per_gram, purchase_price,product,quantity,} = purchaseData[index];
                    // const salesData = {customer_id, visit_type,brand_type, trading_date, purchase_staff, store_name, product_type_one, product_type_two, metal_type, price_per_gram, purchase_price, product,quantity}
                    const salesData = purchaseData[index];
                    salesData.signature = filename;
                    if(salesData.product_type_one != '貴金属') {
                        delete salesData.metal_type;
                        delete salesData.price_per_gram;
                    }
                    delete salesData.id;
                    console.log("salesData",salesData)
                    const sales = await Sales.create(salesData);
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
            const sales = await Sales.findByPk(req.params.id)
                // console.log(JSON.stringify(salesWithCustomer, null, 2));
            // console.log('saleList',salesWithCustomer);
            res.send(sales);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    }

}