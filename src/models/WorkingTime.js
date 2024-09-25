module.exports = (sequelize, DataTypes) => {
    const WorkingTime = sequelize.define('WorkingTime', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      date:            DataTypes.STRING(50),
      userId:          DataTypes.STRING,
      loginTime:            DataTypes.STRING,
      logoutTime:           DataTypes.STRING,
      workingTime:          DataTypes.STRING,
  
    })
    WorkingTime.associate = (models) => {
      WorkingTime.belongsTo(models.User, { foreignKey: 'userId'}); 
    };
    return WorkingTime
  }