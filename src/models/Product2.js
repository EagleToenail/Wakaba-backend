module.exports = (sequelize, DataTypes) => {
    const Product2 = sequelize.define('Product2', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category:       DataTypes.STRING, 

    },
    {
        timestamps: false,    // Optional: disable timestamps if you don't have createdAt/updatedAt fields
      })

    return Product2
}