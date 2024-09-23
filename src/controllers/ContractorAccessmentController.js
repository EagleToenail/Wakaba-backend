const { PreciousMetals, Clock,Bag,Wallet,Accessories,Camera,Antique,WesternLiquor,MusicalInstrument,OldCoin,Kimono,SmartPhoneAndTablet} = require('../models');
const {Master} = require('../models');
// const User = require('../models/User');
const response = require('../helpers/response');
// const { Op } = require('sequelize');

module.exports = {
async getData (req, res) {
    try {
        const preciousMetals = await Master.findAll({
            where :{
                product_type_one:'貴金属'
            }
        });
        const clocks = await Master.findAll({
            where :{
                product_type_one:'時計'
            }
        });
        const bags = await Master.findAll({
            where :{
                product_type_one:'バッグ'
            }
        });
        const wallets = await Master.findAll({
            where :{
                product_type_one:'財布'
            }
        });
        const accessories = await Master.findAll({
            where :{
                product_type_one:'アクセサリ'
            }
        });
        const cameras = await Master.findAll({
            where :{
                product_type_one:'カメラ'
            }
        });
        const antiques = await Master.findAll({
            where :{
                product_type_one:'骨董品'
            }
        });
        const westernLiquors = await Master.findAll({
            where :{
                product_type_one:'洋酒'
            }
        });
        const musicalInstruments = await Master.findAll({
            where :{
                product_type_one:'楽器'
            }
        });
        const oldCoins = await Master.findAll({
            where :{
                product_type_one:'古銭等'
            }
        });
        const kimonos = await Master.findAll({
            where :{
                product_type_one:'着物'
            }
        });
        const smartPhoneAndTablets = await Master.findAll({
            where :{
                product_type_one:'スマホ夕ブレット'
            }
        });
        // const preciousMetals = await PreciousMetals.findAll({});
        // const clocks = await Clock.findAll({});
        // const bags = await Bag.findAll({});
        // const wallets = await Wallet.findAll({});
        // const accessories = await Accessories.findAll({});
        // const cameras = await Camera.findAll({});
        // const antiques = await Antique.findAll({});
        // const westernLiquors = await WesternLiquor.findAll({});
        // const musicalInstruments = await MusicalInstrument.findAll({});
        // const oldCoins = await OldCoin.findAll({});
        // const kimonos = await Kimono.findAll({});
        // const smartPhoneAndTablets = await SmartPhoneAndTablet.findAll({});
        // console.log(preciousMetals,'asd')

        response({
        res,
        payload: {preciousMetals,
            clocks,
            bags,
            wallets,
            accessories,
            cameras,
            antiques,
            westernLiquors,
            musicalInstruments,
            oldCoins,
            kimonos,
            smartPhoneAndTablets
        },
        });
    } catch (error0) {
        response({
        res,
        statusCode: error0.statusCode || 500,
        success: false,
        message: error0.message,
        });
    }
},
//-------------------------PreciousMetal-----------------------------------
async addPreciousMetalData (req, res) {
    try {
        const preciousMetalData = req.body;
        const newpreciousMetalData = await PreciousMetals.create(preciousMetalData)
        res.send(newpreciousMetalData);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to update customer information"
        })
    }
},
async updatePreciousMetalData (req, res) {
    try {
        const preciousMetalData = req.body;
        const id = req.body.id;  
        delete preciousMetalData.id;
        delete preciousMetalData.createdAt;
        delete preciousMetalData.updatedAt;


        await PreciousMetals.update(preciousMetalData, {
            where: {
                id: id
            }
        })
    
        res.send({"success":true});
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to update customer information"
        })
    }
},
async deletePreciousMetalData(req, res) {
    try {
        const preciousMetalDataData = await PreciousMetals.findByPk(req.params.Id)
        if (!preciousMetalDataData) {
            return res.status(403).send({
                error: 'No sales to delete.'
            })
        }
        await preciousMetalDataData.destroy()
        res.send({'success':true})

    } catch (err) {
        res.status(500).send({
            error: 'An error occured when trying to delete a sales.'
        })
    }
},
//-------------------------OldCoin-----------------------------------
async addOldCoinData (req, res) {
    try {
        const oldCoinData = req.body;
        console.log("precious",oldCoinData)

        const newoldcoin = await OldCoin.create(oldCoinData)
    console.log('newoldcoin',newoldcoin);
        res.send(newoldcoin);
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to update customer information"
        })
    }
},
async updateOldCoinData (req, res) {
    try {
        const oldCoinData = req.body;
        const id = req.body.id;  
        delete oldCoinData.id;
        delete oldCoinData.createdAt;
        delete oldCoinData.updatedAt;
        // console.log("precious",oldCoinData,id)

        await OldCoin.update(oldCoinData, {
            where: {
                id: id
            }
        })
    
        res.send({"success":true});
    } catch (err) {
        res.status(500).send({
            error: "An error occured when trying to update customer information"
        })
    }
},
async deleteOldCoinData(req, res) {
    try {
        console.log('sfsadfasdf',req.params.Id)
        const oldCoinData = await OldCoin.findByPk(req.params.Id)
        if (!oldCoinData) {
            return res.status(403).send({
                error: 'No sales to delete.'
            })
        }
        await oldCoinData.destroy()
        res.send({'success':true})

    } catch (err) {
        res.status(500).send({
            error: 'An error occured when trying to delete a sales.'
        })
    }
},

}