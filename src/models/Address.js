//======Address mycreating============
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
      id: {
        type:           DataTypes.INTEGER,
        allowNull:      false,
        primaryKey:     true,
        autoIncrement:  true
      },
      street:            DataTypes.STRING,
      province:          DataTypes.STRING,
      city:              DataTypes.STRING,
      neighborhood:      DataTypes.STRING,
      town:              DataTypes.STRING,
      desciption:        DataTypes.TEXT,
    })
    Address.associate = function (models) {
        Address.belongsTo(models.User)
        Address.belongsTo(models.Vendor)
      }
    return Address
  }