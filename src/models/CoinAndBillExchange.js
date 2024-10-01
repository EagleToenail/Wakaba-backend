module.exports = (sequelize, DataTypes) => {
    const CoinAndBillExchange = sequelize.define('CoinAndBillExchange', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      status: {
        type: DataTypes.ENUM,
        values: ['査定中', 'お預かり'],
        defaultValue: '査定中'
      },
      staff_name: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      phone: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      bank_name: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      application_date: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      exchange_date: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      total_coin_values: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      total_bill_values: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      total_values: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      description: {
        type: DataTypes.STRING(50),
        defaultValue:'0',
      }, 
      coinids: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      coinvalues: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      billids: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      billvalues: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
    })
    return CoinAndBillExchange
  }