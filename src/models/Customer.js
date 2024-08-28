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
      trigger:              DataTypes.TEXT, 
      shop:                DataTypes.TEXT,
    })
    // User.associate = function (models) {
    //   User.belongsTo(models.Company)
    //}
    return Customer
  }