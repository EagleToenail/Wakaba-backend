const { BOOLEAN } = require("sequelize")

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
        default: '',
      },
      readed: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: false,
      },
      replyTo: {
        type: DataTypes.STRING, // -> target chat._id
        default: null,
      },
      deletedBy: {
        type: DataTypes.JSON, // -> userId
        default: [],
      },
      fileId: {
        type: DataTypes.STRING,
        default: null,
      },
    })
    return Chat
  }