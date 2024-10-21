const { STRING, TEXT } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      full_name:           DataTypes.STRING,
      email:               DataTypes.STRING,
      katakana_name:       DataTypes.STRING,
      phone_number:        DataTypes.STRING,
      address:             DataTypes.TEXT,
      trigger:             DataTypes.TEXT,
      visit_type:          DataTypes.STRING(20),
      brand_type:          DataTypes.STRING(20), 
      shop:                DataTypes.TEXT,

      customer_type:     {
        type: DataTypes.STRING(50),
        defaultValue: 'VIP'
      },     
      idcard_number:          DataTypes.STRING(50),
      visit_number:          DataTypes.STRING(10),
      last_visit_date:          DataTypes.STRING(20),
    
      job:                  DataTypes.STRING,
      idCard_url:  {
        type: DataTypes.STRING,
        defaultValue:       ''
      },
      cardType:             DataTypes.STRING,
      avatar_url:            {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      prefeature:           DataTypes.STRING,
      birthday:             DataTypes.STRING,
      age:                  DataTypes.STRING,
      city:                 DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ['男', '女'], // Enum values
        defaultValue:       '男'
      },
      special_note :       {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      item1:                DataTypes.STRING,
      item2:                DataTypes.STRING,
      item3:                DataTypes.STRING,
      item4:                DataTypes.STRING(50),
      item5:                DataTypes.STRING(50),
      line_friend:           {
        type: DataTypes.ENUM,
        values: ['yes', 'no'], // Enum values
        defaultValue:       'no'
      },
      google_review:         {
        type: DataTypes.ENUM,
        values: ['yes', 'no'], // Enum values
        defaultValue:       'no'
      },
      novelty_item:         DataTypes.STRING,
      novelty_item_number:  DataTypes.STRING,
      cupon_item:           DataTypes.STRING,
      cupon_item_number:   DataTypes.STRING,
    })
    Customer.associate = (models) => {
      Customer.hasMany(models.Sales, { foreignKey: 'customer_id'});
      Customer.hasMany(models.Master, { foreignKey: 'customer_id'});
    };
    return Customer
  }