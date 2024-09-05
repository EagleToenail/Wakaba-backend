module.exports = (sequelize, DataTypes) => {
    const WorkingTime = sequelize.define('WorkingTime', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      userId: {
        type:              DataTypes.STRING,
        unique:             true
      },
      loginTime:            DataTypes.STRING,
      logoutTime:           DataTypes.STRING,
      workingTime:          DataTypes.STRING,
  
    })
    return WorkingTime
  }