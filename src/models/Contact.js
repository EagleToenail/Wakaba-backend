
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        id: {
          type:             DataTypes.INTEGER,
          allowNull:        false,
          primaryKey:       true,
          autoIncrement:    true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Profiles',
            key: 'id'
          }
        },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Groups',
            key: 'id'
          }
        },
        friendId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Profiles',
            key: 'id'
          }
        },
  
    }, {
        timestamps: false,     // Optional: disable timestamps if you don't have createdAt/updatedAt fields
      },
    )
    Contact.associate = (models) => {
      Contact.belongsTo(models.Profile, { foreignKey: 'friendId', as: 'profile' });
    };
    return Contact
  }