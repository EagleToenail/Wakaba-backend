module.exports = (sequelize, DataTypes) => {
    const Product3 = sequelize.define('Product3', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category:       DataTypes.STRING(50),
        parentId:         DataTypes.STRING(30),
        remarks:        DataTypes.STRING(50), 

    },
    {
        timestamps: false,    // Optional: disable timestamps if you don't have createdAt/updatedAt fields
      })

    return Product3
}