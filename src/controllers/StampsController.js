
const {StampSheet} = require('../models');
const {StampRose} = require('../models');
const {StampInterestRate} = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
    async getStampRate(req, res) {
        try {
            const stamprate = await StampInterestRate.findOne({
                where: {
                    id: 1
                }
            });
            res.send(stamprate);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    //----------stamp sheet------------------
	async createStampSheet(req, res) {
		try {
			const stampSheet = await StampSheet.create(req.body);
            const stampSheetList = await StampSheet.findAll();
			res.send(stampSheetList)
		} catch (err) {
			res.status(500).send({
				error: "An error occured when trying to create a sale."
			})
		}
	},
    async getStampSheetList(req, res) {
        try {
            const stampSheetList = await StampSheet.findAll();
            res.send(stampSheetList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateStampSheet(req, res) {
        try {
            console.log('aaa')
            console.log('ads',req.body)
            const {id,stampValue,numberOfSides,sheetValue,numberOfSheets,totalFaceValue,purchasePrice} = req.body;
            const updateField = {stampValue,numberOfSides,sheetValue,numberOfSheets,totalFaceValue,purchasePrice};

            await StampSheet.update(updateField, {
                where: {
                    id: id
                }
            })
            const stampSheetList = await StampSheet.findAll();
			res.send(stampSheetList)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update customer information"
            })
        }
    },
//----------------stamp Rose-----------------------------
    async createStampRose(req, res) {
        try {
            const stamprose = await StampRose.create(req.body);
            const stampRoseList = await StampRose.findAll();
            res.send(stampRoseList)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to create a sale."
            })
        }
    },
    async getStampRoseList(req, res) {
        try {
            const stampRoseList = await StampRose.findAll();
            res.send(stampRoseList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
}