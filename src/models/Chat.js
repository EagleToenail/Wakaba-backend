

module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      userId: {
        type:              DataTypes.STRING,
        required:             true
      },
      roomId: {
        type: DataTypes.STRING,
        required: true,
      },
      text: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      readed: {
        type: DataTypes.ENUM,
        values: ["true","false"],
        required: true,
        defaultValue: "false",
      },
      replyTo: {
        type: DataTypes.STRING, // -> target chat._id
        defaultValue: null,
      },
      deletedBy: {
        type: DataTypes.JSON, // -> userId
        defaultValue: [],
      },
      fileId: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    })

    // Chat.associate = (models) => {
    //   Chat.belongsTo(models.Profile, { foreignKey: 'userId' });
    //   Chat.belongsTo(models.File, { foreignKey: 'fileId' });
    // };
    
    return Chat
  }