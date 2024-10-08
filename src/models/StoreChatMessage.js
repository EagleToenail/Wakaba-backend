module.exports = (sequelize, DataTypes) => {
    const StoreChatMessage = sequelize.define('StoreChatMessage', {
        id: {
            type:             DataTypes.INTEGER,
            allowNull:        false,
            primaryKey:       true,
            autoIncrement:    true
        },
        thread_name: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
        time: {
            type: DataTypes.STRING(30),
            allowNull: false
          },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        senderId: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        parentMessageId: {
            type: DataTypes.STRING(20),
            allowNull: true,

        },
        fileUrl: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
        },
        store_name: {
            type: DataTypes.STRING(30),
        },

    })


    return StoreChatMessage
  }