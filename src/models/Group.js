module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id: {
          type:             DataTypes.INTEGER,
          allowNull:        false,
          primaryKey:       true,
          autoIncrement:    true
        },
        roomId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          adminId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          participantsId: {
            type: DataTypes.JSON, // Use JSONB to store arrays
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING(32), // Set maximum length
            allowNull: false,
          },
          desc: {
            type: DataTypes.STRING(300), // Set maximum length
            defaultValue: '',
          },
          avatar: {
            type: DataTypes.STRING,
            defaultValue: null,
          },
          link: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            defaultValue: () => `/group/+${uniqueId(16)}`, // Set default value using a function
          },
        }, {
          tableName: 'groups', // Optional: specify table name if you want to use a custom name
          timestamps: true,    // Enable timestamps to automatically create `createdAt` and `updatedAt` fields
        })

        // Group.associate = (models) => {
        //   Group.hasMany(models.Inbox, { foreignKey: 'roomId', as: 'inboxes' });
        // };
        
    return Group
  }