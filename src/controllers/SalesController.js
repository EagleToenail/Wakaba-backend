const { Sales } = require('../models')

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
            const salesList = await Sales.findAll({
                attributes: [
                    "id",
                    "no",
                    "date",
                    "purchasing_officer",
                    "customer_name",
                    "reading",
                    "telephone_number",
                    "address",
                    "visit_type",
                    "brand_type",
                    "store_name",
                    "card_distribution",
                    "card_collection",
                    "product_type_one",
                    "product_type_two",
                    "merchandise",
                    "number",
                    "Denomination",
                    "g_face_value",
                    "purchase_price",
                    "sales_amount",
                    "gross_profit",
                    "wholesale_date",
                    "deposit_date",
                    "single_day_purchase_amount",
                    "single_gross_profit",
                    "current_month_gross_profit",
                    "safe_deposit_extra",
                    "valance",
                    "incoming_call",
                    "visit",
                    "hitter",
                    "wholesaler",
                    "remarks",
                    "note_two",
                    "state_flage",
                ]
            })
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