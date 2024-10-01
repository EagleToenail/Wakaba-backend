module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('Bill', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      billValue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      numberOfBills: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      totalBillValue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
    })
    return Bill
  }