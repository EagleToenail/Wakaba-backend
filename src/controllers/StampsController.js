
const {StampSheet} = require('../models');
const {StampPasting} = require('../models');
const {StampRose} = require('../models');
const {StampPack} = require('../models');
const {StampCard} = require('../models');
const {StampInterestRate} = require('../models');
const {StampsTransaction} = require('../models');
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
            const sheetRows = req.body.sheetRows;
            const roseRows = req.body.roseRows;
            const packRows = req.body.packRows;
            const cardRows = req.body.cardRows;
            const inorout = req.body.inorout;
            const id = req.body.id;

            const updateSheet = sheetRows.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields
                const existingSheet = await StampSheet.findByPk(id);
                const updatedData = {};
                for (const key in newData) {
                    if(inorout === '入庫') {
                        if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                            updatedData[key] = (parseInt(existingSheet[key]) + parseInt(newData[key])); // Append new data
                        }
                    }
                    if(inorout === '出庫') {
                        if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                            updatedData[key] = (parseInt(existingSheet[key]) - parseInt(newData[key])); // Append new data
                        }
                    }
                }
                
                await StampSheet.update(updatedData, { where: { id } });
            });
            const updateRose = roseRows.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields
                const existingSheet = await StampRose.findByPk(id);
                const updatedData = {};
                for (const key in newData) {
                    if(inorout === '入庫') {
                        if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                            updatedData[key] = (parseInt(existingSheet[key]) + parseInt(newData[key])); // Append new data
                        }
                    }
                    if(inorout === '出庫') {
                        if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                            updatedData[key] = (parseInt(existingSheet[key]) - parseInt(newData[key])); // Append new data
                        }
                    }

                }
                
                await StampRose.update(updatedData, { where: { id } });
            });
            const updatePack = packRows.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields
                const existingSheet = await StampPack.findByPk(id);
                const updatedData = {};
                for (const key in newData) {
                    if(inorout === '入庫') {
                        if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                            updatedData[key] = (parseInt(existingSheet[key]) + parseInt(newData[key])); // Append new data
                        }
                    }
                    if(inorout === '出庫') {
                        if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                            updatedData[key] = (parseInt(existingSheet[key]) - parseInt(newData[key])); // Append new data
                        }
                    }

                }
                
                await StampPack.update(updatedData, { where: { id } });
            });
            const updateCard = cardRows.map(async (data) => {
                const { id, ...newData } = data; // Extract id and other fields
                const existingSheet = await StampCard.findByPk(id);
                const updatedData = {};
                for (const key in newData) {
                    if(inorout === '入庫') {
                        if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                            updatedData[key] = (parseInt(existingSheet[key]) + parseInt(newData[key])); // Append new data
                        }
                    }
                    if(inorout === '出庫') {
                        if(key === 'numberOfSheets' || key === 'totalFaceValue' || key === 'purchasePrice'){
                            updatedData[key] = (parseInt(existingSheet[key]) - parseInt(newData[key])); // Append new data
                        }
                    }
                }
                await StampCard.update(updatedData, { where: { id } });
            });
            //update transaction
            const stateUpdate = {};
            stateUpdate.stamp_status = '承認された' 
            const stamphistory = await StampsTransaction.update(stateUpdate,{
                    where: {
                        id: id
                    }
            });
            res.send({success:true});
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update customer information"
            })
        }
    },
//----------------stamp Pasting-----------------------------
    async createStampPasting(req, res) {
        try {
            const stamppasting = await StampPasting.create(req.body);
            const stampPastingList = await StampPasting.findAll();
            // console.log('========================================',stampPastingList)
            res.send(stampPastingList)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to create a sale."
            })
        }
    },
    async getStampPastingList(req, res) {
        try {
            const stampPastingList = await StampPasting.findAll();
            res.send(stampPastingList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateStampPasting(req, res) {
        try {
            const { id, ...newData } = req.body; // Extract id and other fields
            await StampPasting.update(newData, { where: { id } });
            const stampPastingList = await StampPasting.findAll();
            res.send(stampPastingList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
//----------------stamp Rose-----------------------------
    async createStampRose(req, res) {
        try {
            const stamprose = await StampRose.create(req.body);
            const stampRoseList = await StampRose.findAll();
            //console.log('========================================',stampRoseList)
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
//----------------------inbound----------------------------------------------
    async createStampInbound(req, res) {
        try {
            const {currentDay,username,reason,sheetIds,sheetValues,pastingIds,pastingValues,roseIds,roseValues,packIds,packValues,cardIds,cardValues,
                totalFaceValue1,totalFaceValue2,totalPastingFaceValue1,totalPastingFaceValue2,totalRoseFaceValue1,totalRoseFaceValue2,totalPackFaceValue1,totalPackFaceValue2,totalCardFaceValue1,totalCardFaceValue2} = req.body;
            if(sheetIds.length !== 0) {
                // console.log('====');
                const createData = {};
                createData.date = currentDay;
                createData.in_charge = username;
                createData.inorout = '人庫';
                createData.stamp_type = '切手シート';
                createData.stamp_ids = sheetIds.toString();
                createData.stamp_numbers = sheetValues.toString();
                createData.totalFaceValue = Number(totalFaceValue1) + Number(totalFaceValue2);
                createData.five_up_facevalue = Number(totalFaceValue1);
                createData.five_down_facevalue = Number(totalFaceValue2);
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
            }
            if(pastingIds.length !== 0) {
                // console.log('====');
                const createData = {};
                createData.date = currentDay;
                createData.in_charge = username;
                createData.inorout = '人庫';
                createData.stamp_type = '切手台紙貼り';
                createData.stamp_ids = pastingIds.toString();
                createData.stamp_numbers = pastingValues.toString();
                createData.totalFaceValue = Number(totalPastingFaceValue1) + Number(totalPastingFaceValue2);
                createData.five_up_facevalue = Number(totalPastingFaceValue1);
                createData.five_down_facevalue = Number(totalPastingFaceValue2);
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
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
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
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
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
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
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
            }
            res.send({success:true})
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to create a sale."
            })
        }
    },
//----------------------outbound----------------------------------------------
    async createStampOutbound(req, res) {
        try {
            const {currentDay,username,reason,sheetIds,sheetValues,pastingIds,pastingValues,roseIds,roseValues,packIds,packValues,cardIds,cardValues,
                totalFaceValue1,totalFaceValue2,totalPastingFaceValue1,totalPastingFaceValue2,totalRoseFaceValue1,totalRoseFaceValue2,totalPackFaceValue1,totalPackFaceValue2,totalCardFaceValue1,totalCardFaceValue2} = req.body;
            if(sheetIds.length !== 0) {
                // console.log('====');
                const createData = {};
                createData.date = currentDay;
                createData.in_charge = username;
                createData.inorout = '出庫';
                createData.stamp_type = '切手シート';
                createData.stamp_ids = sheetIds.toString();
                createData.stamp_numbers = sheetValues.toString();
                createData.totalFaceValue = Number(totalFaceValue1) + Number(totalFaceValue2);
                createData.five_up_facevalue = Number(totalFaceValue1);
                createData.five_down_facevalue = Number(totalFaceValue2);
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
            }
            if(pastingIds.length !== 0) {
                // console.log('====');
                const createData = {};
                createData.date = currentDay;
                createData.in_charge = username;
                createData.inorout = '出庫';
                createData.stamp_type = '切手台紙貼り';
                createData.stamp_ids = pastingIds.toString();
                createData.stamp_numbers = pastingValues.toString();
                createData.totalFaceValue = Number(totalPastingFaceValue1) + Number(totalPastingFaceValue2);
                createData.five_up_facevalue = Number(totalPastingFaceValue1);
                createData.five_down_facevalue = Number(totalPastingFaceValue2);
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
            }
            if(roseIds.length !== 0) {
                // console.log('====');
                const createData = {};
                createData.date = currentDay;
                createData.in_charge = username;
                createData.inorout = '出庫';
                createData.stamp_type = '切手バラ';
                createData.stamp_ids = roseIds.toString();
                createData.stamp_numbers = roseValues.toString();
                createData.totalFaceValue = Number(totalRoseFaceValue1) + Number(totalRoseFaceValue2);
                createData.five_up_facevalue = Number(totalRoseFaceValue1);
                createData.five_down_facevalue = Number(totalRoseFaceValue2);
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
            }
            if(packIds.length !== 0) {
                // console.log('====');
                const createData = {};
                createData.date = currentDay;
                createData.in_charge = username;
                createData.inorout = '出庫';
                createData.stamp_type = 'レ夕一パック';
                createData.stamp_ids = packIds.toString();
                createData.stamp_numbers = packValues.toString();
                createData.totalFaceValue = Number(totalPackFaceValue1) + Number(totalPackFaceValue2);
                createData.five_up_facevalue = Number(totalPackFaceValue1);
                createData.five_down_facevalue = Number(totalPackFaceValue2);
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
            }
            if(cardIds.length !== 0) {
                // console.log('====');
                const createData = {};
                createData.date = currentDay;
                createData.in_charge = username;
                createData.inorout = '出庫';
                createData.stamp_type = 'レ夕一パック';
                createData.stamp_ids = cardIds.toString();
                createData.stamp_numbers = cardValues.toString();
                createData.totalFaceValue = Number(totalCardFaceValue1) + Number(totalCardFaceValue2);
                createData.five_up_facevalue = Number(totalCardFaceValue1);
                createData.five_down_facevalue = Number(totalCardFaceValue2);
                createData.reason = reason;
                // console.log('====',createData);
                await StampsTransaction.create(createData);
            }
            res.send({success:true})
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to create a sale."
            })
        }
    },
//------------------getstamphistory--------------------------------------
async getStampShippingHistory(req, res) {
    try {
        const stamphistory = await StampsTransaction.findAll();
        res.send(stamphistory);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
async postStampShippingHistory(req, res) {
    try {
        const date = req.body.payload;
        const stamphistory = await StampsTransaction.findAll({
            where: {
                date: {
                    [Op.like]: `%${date}%` // Replace 'yourFieldName' with the actual field you want to search
                },
            }
        });
        res.send(stamphistory);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
async detailStampShippingHistory(req, res) {
    try {
        const historyId = req.body.historyId;
        console.log('---------detail',historyId)
        const stamphistory = await StampsTransaction.findOne({
            where: {
                id: historyId
            }
        });
        res.send(stamphistory);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},
async searchStampShippingHistory(req, res) {
    try {
        const { start_date, end_date, inorout ,stamp_type} = req.body.params;
        // console.log('-------------',start_date, end_date, inorout ,stamp_type)
        const whereClause = [];
        if (inorout!='') {
            whereClause.push ({
                inorout: { [Op.like]: `%${inorout}%` } 
            });
        }
        if (stamp_type!='') {
            whereClause.push ({
                stamp_type: { [Op.like]: `%${stamp_type}%` } 
            });
        }
        if (start_date!='' && end_date!='') {
            const stamphistory = await StampsTransaction.findAll({
                    where: {
                        [Op.and]: whereClause,
                        date:{
                            [Op.between]: [start_date, end_date]
                        }
                    }
            });
            res.send(stamphistory);
        } else {
            const stamphistory = await StampsTransaction.findAll({
                    where: {
                        [Op.and]: whereClause
                    }
            });
            res.send(stamphistory);
        }
 
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to get sales list."
        })
    }
},


}