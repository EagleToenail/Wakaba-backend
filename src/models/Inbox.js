module.exports = (sequelize, DataTypes) => {
    const Inbox = sequelize.define('Inbox', {
        id: {
          type:             DataTypes.INTEGER,
          allowNull:        false,
          primaryKey:       true,
          autoIncrement:    true
        },
        ownersId: {
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
          roomType: {
            type: DataTypes.ENUM('private', 'group'),
            allowNull: false,
            defaultValue: 'private',
          },
          archivedBy: {
            type: DataTypes.JSON, // Use JSONB for arrays
            defaultValue: [],
          },
          unreadMessage: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
          },
          fileId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            references: {
              model: 'Files',
              key: 'id'
            }
          },
          deletedBy: {
            type: DataTypes.JSON, // Use JSONB for arrays
            defaultValue: [],
          },
          content: {
            type: DataTypes.JSON, // Use JSONB to store complex nested data
            allowNull: false,
            defaultValue: {
              from: '',          // Default empty string or a placeholder
              senderName: '',    // Default empty string or a placeholder
              text: '',          // Default empty string or a placeholder
              time: new Date().toISOString(), // Default to current date
            },
          },
        }, {
          timestamps: false,    // Optional: disable timestamps if you don't have createdAt/updatedAt fields
        })

        Inbox.associate = (models) => {
          Inbox.belongsTo(models.Profile, { foreignKey: 'ownersId', as: 'profiles' });
          Inbox.belongsTo(models.Group, { foreignKey: 'roomId', as: 'group' });
          Inbox.belongsTo(models.File, { foreignKey: 'fileId', as: 'file' });
        };

    return Inbox
  }