module.exports = (sequelize, DataTypes) => {
    const MusicalInstrument = sequelize.define('MusicalInstrument', {
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
        type: DataTypes.TEXT, // Using TEXT for potentially long remarks; adjust if needed
        allowNull: true
      },
      assessment_date: {
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if only the date part is needed
        allowNull: true
      },
      orchestra: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      yahoo_auctions_wholesale: {
        type: DataTypes.DECIMAL(15, 2), // Adjust precision and scale based on your needs
        allowNull: true
      }
    })
    return MusicalInstrument
  }