module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    vendor_name: DataTypes.STRING,
    categoryIds: {
      type: DataTypes.STRING(50),
      defaultValue:'',
    },
  },
    {
      timestamps: false,    // Optional: disable timestamps if you don't have createdAt/updatedAt fields
    })

  return Vendor
}