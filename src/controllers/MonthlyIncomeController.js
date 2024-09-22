const { SafeMoney } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    async getMonthlyIncomeList (req, res) {
        try {
            const date = new Date();
            const year = date.getFullYear(); // Get the current year
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the current month (0-11) and pad it

            const yearMonth = `${year}-${month}`;
            // console.log(yearMonth); // Output: "2024-09"

            const moneyIncomeList = await SafeMoney.findAll({
                where: {
                    date: {
                        [Op.like]: `%${yearMonth}%` // Replace 'yourFieldName' with the actual field you want to search
                    }
                }
            });
            res.send(moneyIncomeList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async postMonthlyIncomeList (req, res) {
        try {

            const date = req.body.payload;
            const moneyIncomeList = await SafeMoney.findAll({
                where: {
                    date: {
                        [Op.like]: `%${date}%` // Replace 'yourFieldName' with the actual field you want to search
                    }
                }
            });
            res.send(moneyIncomeList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async postPeriodMonthlyIncomeList (req, res) {
        try {

            const startdate = req.body.start;
            const enddate = req.body.end;
            const moneyIncomeList = await SafeMoney.findAll({
                where: {
                    date: { // Replace 'createdAt' with the appropriate date field in your model
                        [Op.between]: [startdate, enddate]
                    }
                }
            });
            res.send(moneyIncomeList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get sales list."
            })
        }
    },
    async updateMonthlyIncome (req, res) {
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