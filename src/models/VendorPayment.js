//==============mycreating===============
module.exports = (sequelize, DataTypes) => {
    const VendorPayment = sequelize.define('VendorPayment', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      vendorID:                   DataTypes.INTEGER,
      amount:                    DataTypes.FLOAT,
      paymentDate:               DataTypes.DATE,
      nextPaymentDate:           DataTypes.DATE,
    })
    return VendorPayment
  }