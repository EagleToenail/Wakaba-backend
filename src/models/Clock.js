module.exports = (sequelize, DataTypes) => {
    const Clock = sequelize.define('Clock', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      shipping_address:                     DataTypes.STRING,
      shipping_date:                        DataTypes.STRING,
      number:                               DataTypes.STRING,
      product:                              DataTypes.STRING,
      model_number_one:                     DataTypes.STRING,
      model_number_two:                     DataTypes.STRING,
      automatic_quartz:                     DataTypes.STRING,
      movable:                              DataTypes.STRING,
      tester:                               DataTypes.STRING,
      box_guarantee:                        DataTypes.STRING,
      purchase_price:                       DataTypes.FLOAT,
      skype_date:                           DataTypes.STRING,
      bb:                                   DataTypes.STRING,
      ga:                                   DataTypes.STRING,
      belmond:                              DataTypes.STRING,
      homecom:                              DataTypes.STRING,
      kaimana:                              DataTypes.STRING,
      four_nine:                            DataTypes.STRING,
      yahoo_auction:                        DataTypes.STRING,
  
    })
    return Clock
  }