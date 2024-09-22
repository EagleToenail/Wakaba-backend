module.exports = (sequelize, DataTypes) => {
    const SafeMoney = sequelize.define('SafeMoney', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      date : DataTypes.STRING(50),
      total_withdrawal : DataTypes.DECIMAL(35, 2),
      total_purchase_price : DataTypes.DECIMAL(35,2),
      total_expenses : DataTypes.DECIMAL(35,2),
      safe_deposite_extra : DataTypes.DECIMAL(35,2),
      ten_thousand: DataTypes.DECIMAL(30,2),
      five_thousand: DataTypes.DECIMAL(30,2),
      one_thousand: DataTypes.DECIMAL(30,2),
      five_hundred: DataTypes.DECIMAL(30,2),
      one_hundred: DataTypes.DECIMAL(30,2),
      fifty: DataTypes.DECIMAL(30,2),
      ten: DataTypes.DECIMAL(30,2),
      five: DataTypes.DECIMAL(30,2),
      one: DataTypes.DECIMAL(30,2),
      total_amount: DataTypes.DECIMAL(60,2),
      sales_balance: DataTypes.DECIMAL(60,2),
      sales_variance: DataTypes.DECIMAL(60,2),
    })
    return SafeMoney
  }