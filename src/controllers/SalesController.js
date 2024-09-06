const { Sales } = require('../models')
const { Customer } = require('../models')
const { Op } = require('sequelize');

module.exports = {
	async createSales(req, res) {
		try {
			const sales = await Sales.create(req.body)
			res.send(sales)
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
            const sales = await Sales.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            res.send(sales);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update sales information"
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

}