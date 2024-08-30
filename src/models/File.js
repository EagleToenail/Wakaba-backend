module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        id: {
          type:             DataTypes.INTEGER,
          allowNull:        false,
          primaryKey:       true,
          autoIncrement:    true
        },
        fileId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          originalname: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
          },
          url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          type: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          format: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          size: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0',
          },
        }, {
          tableName: 'files', // Optional: specify table name if you want to use a custom name
          timestamps: false,  // Optional: disable timestamps if you don't have createdAt/updatedAt fields
        })
    return File
  }