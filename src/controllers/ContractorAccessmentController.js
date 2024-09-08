const { PreciousMetals, Clock,Bag,Wallet,Accessories,Camera,Antique,WesternLiquor,MusicalInstrument,OldCoin,Kimono,SmartPhoneAndTablet} = require('../models');
// const User = require('../models/User');
const response = require('../helpers/response');
// const { Op } = require('sequelize');

module.exports = {
async getData (req, res) {
    try {
        const preciousMetals = await PreciousMetals.findAll({});
        const clocks = await Clock.findAll({});
        const bags = await Bag.findAll({});
        const wallets = await Wallet.findAll({});
        const accessories = await Accessories.findAll({});
        const cameras = await Camera.findAll({});
        const antiques = await Antique.findAll({});
        const westernLiquors = await WesternLiquor.findAll({});
        const musicalInstruments = await MusicalInstrument.findAll({});
        const oldCoins = await OldCoin.findAll({});
        const kimonos = await Kimono.findAll({});
        const smartPhoneAndTablets = await SmartPhoneAndTablet.findAll({});
        console.log(preciousMetals,'asd')

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

}