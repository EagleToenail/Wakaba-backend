module.exports = (sequelize, DataTypes) => {
    const TodoMessage = sequelize.define('TodoMessage', {
        id: {
            type:             DataTypes.INTEGER,
            allowNull:        false,
            primaryKey:       true,
            autoIncrement:    true
        },
        rShipping_id: {
            type: DataTypes.STRING(20),
            allowNull: true
          },
        invoice_id: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        withdrawbankatm_id: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        withdrawvariouspurchase_id: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        withdrawapply_id: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        onsitepurchase_id: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        disposalpermission_id: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        time: {
            type: DataTypes.STRING,
            allowNull: true
          },
        title: {
            type: DataTypes.STRING,
            allowNull: true
          },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        senderId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        receiverId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parentMessageId: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:'',
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

    return TodoMessage
  }