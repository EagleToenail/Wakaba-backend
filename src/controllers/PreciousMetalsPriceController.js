const { PreciousMetalsPrice } = require('../models');
const cheerio = require('cheerio');

module.exports = {
  async create() {   
    const url = "https://gold.tanaka.co.jp/retanaka/price/";
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      const priceTables = $('table.price_table');
      const data = [];

      priceTables.each((index, table) => {
        const rows = $(table).find('tbody tr');
        rows.each((index, row) => {
          const cols = $(row).find('th, td');
          if (cols.length > 1) {
            const price = $(cols[1]).text().trim();
            data.push(price);
          }
        });
      });
      console.log('data', data);
      // await PreciousMetalsPrice.create(data);
    } catch (error) {
      console.error(error);
    }
  },
  
  async autoSave(req, res) {
    const payload = req.body.payload;
    const dateExit = payload.date;
  
    try {
      const currentDayData = await PreciousMetalsPrice.findOne({
        where: {
          date: dateExit,
        },
      });
  
      if (!currentDayData) {
        await PreciousMetalsPrice.create(payload);
  
        // Check the count of rows and delete if necessary
        const totalCount = await PreciousMetalsPrice.count();
  
        if (totalCount > 30) {
          // Find the oldest entries and delete them
          const oldestEntries = await PreciousMetalsPrice.findAll({
            order: [['date', 'ASC']],
            limit: totalCount - 30,
          });
  
          // Delete the old entries
          await PreciousMetalsPrice.destroy({
            where: {
              id: oldestEntries.map(entry => entry.id), // Use the IDs of the old entries
            },
          });
        }
      }
  
      const preciousMetalList = await PreciousMetalsPrice.findAll();
      res.send(preciousMetalList);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  

  async getPreciousMetalList(req,res){
    try {
      const preciousMetalList = await PreciousMetalsPrice.findAll({
        order: [['createdAt', 'DESC']], 
        limit: 7, 
      });
      res.send(preciousMetalList);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } 



};

