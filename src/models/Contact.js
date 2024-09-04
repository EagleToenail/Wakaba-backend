
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        id: {
          type:             DataTypes.INTEGER,
          allowNull:        false,
          primaryKey:       true,
          autoIncrement:    true
        },
        userId: {
          
            type: DataTypes.STRING,
            allowNull: false,
          },
          roomId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          friendId: {
            type: DataTypes.STRING,
            allowNull: false,
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