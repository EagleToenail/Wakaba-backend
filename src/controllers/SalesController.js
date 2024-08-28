const { Sales } = require('../models')
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
            const salesList = await Sales.findAll()
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
        // console.log('zxczxczcx',value)
        try {
            const salesList = await Sales.findAll({
                where:  {
                    [Op.or]:{product_type_one: { [Op.like]: `%${value}%` } }
                }
            })
            console.log('saleList',salesList);
            res.send(salesList);
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