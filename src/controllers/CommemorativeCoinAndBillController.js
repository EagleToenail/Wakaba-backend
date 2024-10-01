
const {Profile} = require('../models');
const {Coin} = require('../models');
const {Bill} = require('../models');
const {CoinAndBillExchange} = require('../models');

const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
    
    async getProfile(req, res) {
        try {
            const userId = req.body.userId;
            const userProfile = await Profile.findOne({
                where:{
                    user_id:userId
                }
            });
            res.send(userProfile);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    //==========coin--------------
	async createCoin(req, res) {
		try {
			const coinSheet = await Coin.create(req.body);
            const coinList = await Coin.findAll();
			res.send(coinList)
		} catch (err) {
			res.status(500).send({
				error: "An error occured when trying to create a sale."
			})
		}
	},
    async getCoinList(req, res) {
        try {
            const coinList = await Coin.findAll();
            res.send(coinList);
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
    //==========bill--------------
	async createBill(req, res) {
		try {
			const bill = await Bill.create(req.body);
            const billList = await Bill.findAll();
			res.send(billList)
		} catch (err) {
			res.status(500).send({
				error: "An error occured when trying to create a sale."
			})
		}
	},
    async getBillList(req, res) {
        try {
            const billList = await Bill.findAll();
            res.send(billList);
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
    //-------------------coin and bill exchange create-------------------
    async getExchangeHistoryById(req, res) {
        try {
            const historyId = req.body.historyId;
            const coinhistory = await CoinAndBillExchange.findOne({
                where: {
                    id: historyId
                }
            });
            res.send(coinhistory);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async getExchangeHistory(req, res) {
        try {
            const exchangeHistory = await CoinAndBillExchange.findAll();
            res.send(exchangeHistory);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    
    async searchExchange(req, res) {
        try {
            const { start_date, end_date, status ,staff_name} = req.body.params;
            // console.log('-------------',start_date, end_date, inorout ,stamp_type)
            const whereClause = [];
            if (inorout!='') {
                whereClause.push ({
                    status: { [Op.like]: `%${status}%` } 
                });
            }
            if (stamp_type!='') {
                whereClause.push ({
                    staff_name: { [Op.like]: `%${staff_name}%` } 
                });
            }
            if (start_date!='' && end_date!='') {
                const exchangephistory = await CoinAndBillExchange.findAll({
                        where: {
                            [Op.and]: whereClause,
                            date:{
                                [Op.between]: [start_date, end_date]
                            }
                        }
                });
                res.send(exchangephistory);
            } else {
                const exchangephistory = await CoinAndBillExchange.findAll({
                        where: {
                            [Op.and]: whereClause
                        }
                });
                res.send(exchangephistory);
            }
     
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async createExchange(req, res) {
        try {
            
            const {staff_name,phone,application_date,bank_name,exchange_date,total_coin_values,total_bill_values,
                description,coinids,coinvalues,billids,billvalues} = req.body;

                if(coinids.length !== 0 || billids.length !== 0) {
                    const createData = {};
                    createData.staff_name = staff_name;
                    createData.phone = phone;
                    createData.application_date = application_date;
                    createData.bank_name = bank_name;
                    createData.exchange_date = exchange_date;
                    createData.total_coin_values = total_coin_values.toString();
                    createData.total_bill_values = total_bill_values.toString();;
                    createData.total_values = (Number(total_coin_values) + Number(total_bill_values)).toString();
                    createData.description = description;
                    createData.coinids = coinids.toString();
                    createData.billids = billids.toString();
                    createData.coinvalues = coinvalues.toString();
                    createData.billvalues = billvalues.toString();
                    createData.totalvalues = billvalues.toString();
                    // console.log('====',createData);
                    await CoinAndBillExchange.create(createData);
                }
                res.send({success:true})
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },


}