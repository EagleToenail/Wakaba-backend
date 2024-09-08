module.exports = (sequelize, DataTypes) => {
    const Kimono = sequelize.define('Kimono', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      shipping_date: {
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if only the date part is needed
        allowNull: true
      },
      number: {
        type: DataTypes.STRING, // Assuming it's a string; change to INTEGER if appropriate
        allowNull: true
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      remarks: {
        type: DataTypes.TEXT, // Using TEXT for potentially long remarks; adjust as needed
        allowNull: true
      },
      assessment_date: {
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if only the date part is needed
        allowNull: true
      },
      hanamori: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      }
    })
    return Kimono
  }