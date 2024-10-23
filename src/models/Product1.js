module.exports = (sequelize, DataTypes) => {
    const Product1 = sequelize.define('Product1', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category:       DataTypes.STRING(50),              
        remarks:       DataTypes.STRING(50),              
        wakaba_point:       DataTypes.STRING(20),              
    },
    {
        timestamps: false,    // Optional: disable timestamps if you don't have createdAt/updatedAt fields
      })

    return Product1
}