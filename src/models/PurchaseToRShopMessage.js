module.exports = (sequelize, DataTypes) => {
    const PurchaseToRShopMessage = sequelize.define('PurchaseToRShopMessage', {
        id: {
            type:             DataTypes.INTEGER,
            allowNull:        false,
            primaryKey:       true,
            autoIncrement:    true
        },
        shipping_id: {
            type: DataTypes.STRING(20),
            allowNull: false
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
        },
        store_name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        permission: {
            type: DataTypes.ENUM,
            values: ['0','1'],
            defaultValue: '0',
        },
        complete: {
            type: DataTypes.ENUM,
            values: ['0','1'],
            defaultValue: '0',
        },
        read: {
            type: DataTypes.ENUM,
            values: ['0','1'],
            defaultValue: '0',
        },
        confirm_price: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    })

    // TodoMessage.associate = (models) => {
    //     TodoMessage.belongsTo(models.User, { foreignKey: 'senderId',as:'senderId'}); 
    //     TodoMessage.belongsTo(models.User, { foreignKey: 'receiverId',as:'receiverId'}); 
    //     TodoMessage.belongsTo(models.TodoMessage, { foreignKey: 'parentMessageId',as:'parentMessageId'});   
    //   };

    return PurchaseToRShopMessage
  }