module.exports = (sequelize, DataTypes) => {
    const StampInterestRate = sequelize.define('StampInterestRate', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      sheetrate: {
        type: DataTypes.STRING(20), // Adjust data type if necessary
        allowNull: true
      },
      roserate: {
        type: DataTypes.STRING(20), // Adjust data type if necessary
        allowNull: true
      },
      packrate: {
        type: DataTypes.STRING(20), // Adjust data type if necessary
        allowNull: true
      },
      cardrate: {
        type: DataTypes.STRING(20), // Adjust data type if necessary
        allowNull: true
      },
    })
    return StampInterestRate
  }