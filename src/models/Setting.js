module.exports = (sequelize, DataTypes) => {
    const Setting = sequelize.define('Setting', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Changed from 'required' to 'allowNull'
    },
      dark: {
        type: DataTypes.ENUM,
        values: ['true', 'false'],
        defaultValue: 'false',
      },
      enterToSend: {
        type: DataTypes.ENUM,
        values: ['true', 'false'],
        defaultValue: 'true',
      },
      mute: {
        type: DataTypes.ENUM,
        values: ['true', 'false'],
        defaultValue: 'false',
      },
      sortContactByName: {
        type: DataTypes.ENUM,
        values: ['true', 'false'],
        defaultValue: 'false',
      },
    })
    return Setting
  }