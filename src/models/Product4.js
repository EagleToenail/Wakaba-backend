module.exports = (sequelize, DataTypes) => {
    const Product4 = sequelize.define('Product4', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category:       DataTypes.STRING(50), 
        parentId:         DataTypes.STRING(30),
        remarks:       DataTypes.STRING(50), 

    },
    {
        timestamps: false,    // Optional: disable timestamps if you don't have createdAt/updatedAt fields
      })

    return Product4
}