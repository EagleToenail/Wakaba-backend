module.exports = (sequelize, DataTypes) => {
    const TodoMessage = sequelize.define('TodoMessage', {
        id: {
            type:             DataTypes.INTEGER,
            allowNull:        false,
            primaryKey:       true,
            autoIncrement:    true
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
          },
        title: {
            type: DataTypes.STRING,
            allowNull: false
          },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        senderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentMessageId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fileUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })

    // TodoMessage.associate = (models) => {
    //     TodoMessage.belongsTo(models.User, { foreignKey: 'senderId',as:'senderId'}); 
    //     TodoMessage.belongsTo(models.User, { foreignKey: 'receiverId',as:'receiverId'}); 
    //     TodoMessage.belongsTo(models.TodoMessage, { foreignKey: 'parentMessageId',as:'parentMessageId'});   
    //   };

    return TodoMessage
  }