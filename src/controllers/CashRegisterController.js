const { CashRegister } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    async getCashRegisteList (req, res) {
        try {
            const date = new Date();
            const year = date.getFullYear(); // Get the current year
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the current month (0-11) and pad it

            const yearMonth = `${year}-${month}`;
            console.log('-------------',yearMonth); // Output: "2024-09"

            const cashRegisterList = await CashRegister.findAll({
                where: {
                    application_date: {
                        [Op.like]: `%${yearMonth}%` // Replace 'yourFieldName' with the actual field you want to search
                    }
                }
            });
            res.send(cashRegisterList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async postCashRegisteList (req, res) {
        try {

            const date = req.body.payload;
            const cashRegisterList = await CashRegister.findAll({
                where: {
                    date: {
                        [Op.like]: `%${date}%` // Replace 'yourFieldName' with the actual field you want to search
                    }
                }
            });
            res.send(cashRegisterList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async postPeriodCashRegisteList (req, res) {
        try {

            const {status,type,startdate,enddate} = req.body.params;
            const cashRegisterList = await CashRegister.findAll({
                where: {
                    date: {
                        [Op.between]: [startdate, enddate] // Date range filter
                    },
                    status: status,
                    type: type,
                }
            });
            res.send(cashRegisterList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateCashRegister (req, res) {
        try {
            const {payload} = req.body;
           for (let index = 0; index < payload.length; index++) {
                const element = payload[index];
                const id = element.id;
                delete element.id;
                await SafeMoney.update(element, {
                    where: {
                        id: id
                    }
                })
           }
            res.send({'success':true});
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },

}