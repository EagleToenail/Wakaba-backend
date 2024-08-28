//===============mycreating=============
module.exports = (sequelize, DataTypes) => {
    const Otp = sequelize.define('Otp', {
      id: {
        type:           DataTypes.INTEGER,
        allowNull:      false,
        primaryKey:     true,
        autoIncrement:  true
      },
      phoneNumber:             DataTypes.STRING,
      otpCode:             DataTypes.STRING,
    })

    return Otp
  }