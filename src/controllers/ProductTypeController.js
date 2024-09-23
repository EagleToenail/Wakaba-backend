const { Product1 } = require('../models')
const { Product2 } = require('../models')
const { Product3 } = require('../models')
const { Product4 } = require('../models')
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
    async getProductType2FilterList(req, res) {
        try {
            const parentId = req.body.name;
            const product2List = await Product2.findAll({
                where: {
                    parentId:parentId
                }
            })
            // console.log("customerList",customerList)
            res.send(product2List);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get customer list."
            })
        }
    },
    async getProductType3List(req, res) {
        try {
            const product3List = await Product3.findAll({})
            // console.log("customerList",customerList)
            res.send(product3List);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get customer list."
            })
        }
    },
    async getProductType4List(req, res) {
        try {
            const product4List = await Product4.findAll({})
            // console.log("customerList",customerList)
            res.send(product4List);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get customer list."
            })
        }
    },
}