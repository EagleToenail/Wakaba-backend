const { Customer } = require('../models')

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
            const customerList = await Customer.findAll({
                attributes: [
                    "id",
                    "full_anme",
                    "katakana_name",
                    "phone_number",
                    "address",
                    "trigger",
                    "shop",
                ]
            })
            res.send(customerList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get customer list."
            })
        }
    },
    async updateCustomer(req, res) {
        try {
            const customer = await Customer.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            res.send(customer);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update customer information"
            })
        }
    },
    async deleteCustomer(req, res) {
		try {
			const customer = await Customer.findByPk(req.params.customerId)
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

}