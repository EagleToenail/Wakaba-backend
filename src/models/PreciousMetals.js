module.exports = (sequelize, DataTypes) => {
    const PreciousMetals = sequelize.define('PreciousMetals', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      shipping_address:                     DataTypes.STRING,
      wholesale_date:                       DataTypes.STRING,
      number:                               DataTypes.STRING,
      product:                              DataTypes.STRING,
      quantity:                             DataTypes.STRING,
      gold_type:                            DataTypes.STRING,
      gross_weight:                         DataTypes.STRING,
      purchase_price:                       DataTypes.FLOAT,
      bullion_weight:                       DataTypes.FLOAT,
      book_assessment_net_japan:            DataTypes.STRING,
      line_color_stone_bank:                DataTypes.STRING,
      real_assessment_color_stone_bank:     DataTypes.STRING,
      line_four_nine:                       DataTypes.STRING,
      book_assessment_four_nine:            DataTypes.STRING,
      kaimana_assessment_date:              DataTypes.STRING,
      line_kaimana:                         DataTypes.STRING,
      original_assessment_kaimana:          DataTypes.STRING,
      online_ssessment_date_quote:          DataTypes.STRING,
  
    })
    return PreciousMetals
  }