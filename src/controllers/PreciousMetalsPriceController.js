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
  }
};

