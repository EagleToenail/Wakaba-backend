//==============mycreating===============
const { STRING } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Vendor = sequelize.define('Vendor', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      BusinessName: {
        type:             DataTypes.STRING,
        unique:           true
      },
      firstName:          DataTypes.STRING,
      lastName:           DataTypes.STRING,
      email: {
        type:             DataTypes.STRING,
        unique:           true
      },
      vendorImage:        DataTypes.STRING,
      phone1:             DataTypes.STRING,
      phone2:             DataTypes.STRING,
      branchNumber:       DataTypes.INTEGER,
      shopPlace:          DataTypes.TEXT,

      storeAddress:       DataTypes.INTEGER,//address1
      shippingAddress:    DataTypes.INTEGER,//address2
      additionalAddress:  DataTypes.INTEGER,//address3

      status: {
        type: DataTypes.ENUM,
        values: ['active', 'inactive'], // Enum values
      },
      registerDate: DataTypes.DATE,
      startingDate: DataTypes.DATE,
      stopDate:     DataTypes.DATE,
    })
    Vendor.associate = function (models) {
        Vendor.belongsTo(models.VendorPayment)
      }
    return Vendor
  }