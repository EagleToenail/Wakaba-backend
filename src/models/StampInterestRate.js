module.exports = (sequelize, DataTypes) => {
    const StampInterestRate = sequelize.define('StampInterestRate', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      category: {
        type: DataTypes.STRING(20), // Adjust data type if necessary
        allowNull: true
      },
      percent: {
        type: DataTypes.STRING(20), // Adjust data type if necessary
        defaultValue:'0',
        allowNull: true
      },
    })
    return StampInterestRate
  }