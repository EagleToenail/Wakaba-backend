module.exports = (sequelize, DataTypes) => {
    const SafeMoney = sequelize.define('SafeMoney', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      date : DataTypes.STRING(50),
      total_withdrawal : DataTypes.INTEGER,
      total_purchase_price : DataTypes.INTEGER,
      total_expenses : DataTypes.INTEGER,
      safe_deposite_extra : DataTypes.INTEGER,
      ten_thousand: DataTypes.INTEGER,
      five_thousand: DataTypes.INTEGER,
      one_thousand: DataTypes.INTEGER,
      five_hundred: DataTypes.INTEGER,
      one_hundred: DataTypes.INTEGER,
      fifty: DataTypes.INTEGER,
      ten: DataTypes.INTEGER,
      five: DataTypes.INTEGER,
      one: DataTypes.INTEGER,
      total_amount: DataTypes.INTEGER,
      sales_balance: DataTypes.INTEGER,
      sales_variance: DataTypes.INTEGER,
      store_name: DataTypes.STRING(50),
    })
    return SafeMoney
  }