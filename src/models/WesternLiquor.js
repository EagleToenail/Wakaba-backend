module.exports = (sequelize, DataTypes) => {
    const WesternLiquor = sequelize.define('WesternLiquor', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      shipping_address: {
        type: DataTypes.STRING, // Adjust if needed based on your data
        allowNull: true // Set to false if this field is required
      },
      shipping_date: {
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if time is not needed
        allowNull: true
      },
      wakaba_number: {
        type: DataTypes.STRING, // Assuming it's a string; change to INTEGER if appropriate
        allowNull: true
      },
      kinds: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      brand: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      quantity: {
        type: DataTypes.STRING, // Assuming quantity is a number; change to STRING if appropriate
        allowNull: true
      },
      capacity: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      frequency: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      assessment_date: {
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if time is not needed
        allowNull: true
      },
      yahoo_auctions_highest_price: {
        type: DataTypes.DECIMAL(15, 2), // Adjust precision and scale based on your needs
        allowNull: true
      },
      auction_id: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      gold_liquor: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      linksus: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      }
    })
    return WesternLiquor
  }