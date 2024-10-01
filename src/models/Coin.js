module.exports = (sequelize, DataTypes) => {
    const Coin = sequelize.define('Coin', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      coinValue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      numberOfCoins: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      totalCoinValue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
    })
    return Coin
  }