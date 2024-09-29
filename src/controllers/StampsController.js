
const {StampSheet} = require('../models');
const {StampRose} = require('../models');
const {StampPack} = require('../models');
const {StampCard} = require('../models');
const {StampInterestRate} = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
    //==========stamp interestrae--------------
    async getStampRate(req, res) {
        try {
            const stamprate = await StampInterestRate.findAll();
            res.send(stamprate);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateStampRate(req, res) {
        try {
            // console.log('--------------',req.body.stampRate)
            const stampRate = req.body.stampRate;
            const updateRate = stampRate.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields 
                const updatedData = {};
                updatedData.percent = newData.percent;             
                await StampInterestRate.update(updatedData, { where: { id } });
            });
            const stamprate = await StampInterestRate.findAll();
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
            const { id, ...newData } = req.body; // Extract id and other fields
            await StampSheet.update(newData, { where: { id } });
            const stampSheetList = await StampSheet.findAll();
            res.send(stampSheetList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateStamp(req, res) {
        try {
            // console.log('==========',req.body.sheetRows)
            const sheetRows = req.body.sheetRows;
            const roseRows = req.body.roseRows;
            const packRows = req.body.packRows;
            const cardRows = req.body.cardRows;

            const updateSheet = sheetRows.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields
                const existingSheet = await StampSheet.findByPk(id);
                const updatedData = {};
                for (const key in newData) {
                    if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                        updatedData[key] = (parseFloat(existingSheet[key]) + parseFloat(newData[key])).toFixed(2); // Append new data
                    }
                }
                
                await StampSheet.update(updatedData, { where: { id } });
            });
            const updateRose = roseRows.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields
                const existingSheet = await StampRose.findByPk(id);
                const updatedData = {};
                for (const key in newData) {
                    if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                        updatedData[key] = (parseFloat(existingSheet[key]) + parseFloat(newData[key])).toFixed(2); // Append new data
                    }
                }
                
                await StampRose.update(updatedData, { where: { id } });
            });
            const updatePack = packRows.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields
                const existingSheet = await StampPack.findByPk(id);
                const updatedData = {};
                for (const key in newData) {
                    if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                        updatedData[key] = (parseFloat(existingSheet[key]) + parseFloat(newData[key])).toFixed(2); // Append new data
                    }
                }
                
                await StampPack.update(updatedData, { where: { id } });
            });
            const updateCard = cardRows.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields
                const existingSheet = await StampCard.findByPk(id);
                const updatedData = {};
                for (const key in newData) {
                    if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                        updatedData[key] = (parseFloat(existingSheet[key]) + parseFloat(newData[key])).toFixed(2); // Append new data
                    }
                }
                
                await StampCard.update(updatedData, { where: { id } });
            });
            res.send({success:true});
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
            console.log('========================================',stampRoseList)
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
    async updateStampRose(req, res) {
        try {
            const { id, ...newData } = req.body; // Extract id and other fields
            await StampRose.update(newData, { where: { id } });
            const stampRoseList = await StampRose.findAll();
            res.send(stampRoseList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
//----------------stamp Pack-----------------------------
    async createStampPack(req, res) {
        try {
            const stamppack = await StampPack.create(req.body);
            const stampPackList = await StampPack.findAll();
            res.send(stampPackList)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to create a sale."
            })
        }
    },
    async getStampPackList(req, res) {
        try {
            const stampPackList = await StampPack.findAll();
            res.send(stampPackList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateStampPack(req, res) {
        try {
            const { id, ...newData } = req.body; // Extract id and other fields
            await StampPack.update(newData, { where: { id } });
            const stampPackList = await StampPack.findAll();
            res.send(stampPackList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
//----------------stamp Card-----------------------------
    async createStampCard(req, res) {
        try {
            const stampcard = await StampCard.create(req.body);
            const stampCardList = await StampCard.findAll();
            res.send(stampCardList)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to create a sale."
            })
        }
    },
    async getStampCardList(req, res) {
        try {
            const stampCardList = await StampCard.findAll();
            res.send(stampCardList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateStampCard(req, res) {
        try {
            const { id, ...newData } = req.body; // Extract id and other fields
            await StampCard.update(newData, { where: { id } });
            const stampCardList = await StampCard.findAll();
            res.send(stampCardList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },

}