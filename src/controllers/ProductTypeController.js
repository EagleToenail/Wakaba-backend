const { Product1 } = require('../models')
const { Product2 } = require('../models')
const { Op } = require('sequelize');

module.exports = {

    async getProductType1List(req, res) {
        try {
            const product1List = await Product1.findAll({})
            // console.log("customerList",customerList)
            res.send(product1List);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get customer list."
            })
        }
    },
    async getProductType2List(req, res) {
        try {
            const product2List = await Product2.findAll({})
            // console.log("customerList",customerList)
            res.send(product2List);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get customer list."
            })
        }
    },
}