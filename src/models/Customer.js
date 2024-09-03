const { STRING } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      full_name:           DataTypes.STRING,
      katakana_name:       DataTypes.STRING,
      phone_number:        DataTypes.STRING,
      address:             DataTypes.TEXT,
      trigger:             DataTypes.TEXT, 
      shop:                DataTypes.TEXT,

      opportunity:          DataTypes.STRING,
      job:                  DataTypes.STRING,
      idCard_url:           DataTypes.STRING,
      cardType:             DataTypes.STRING,
      avatar_url:           DataTypes.STRING,
      prefeature:           DataTypes.STRING,
      birthday:             DataTypes.STRING,
      age:                  DataTypes.STRING,
      city:                 DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ['男', '女'], // Enum values
        defaultValue:       '男'
      },

    })

    return Customer
  }