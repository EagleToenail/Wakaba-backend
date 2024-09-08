module.exports = (sequelize, DataTypes) => {
    const Accessories = sequelize.define('Accessories', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      shipping_address: {
        type: DataTypes.STRING, // Adjust if necessary based on the actual data
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
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: true
      },
      product_details: {
        type: DataTypes.STRING, // Adjust if this field has a different type
        allowNull: true
      },
      model_number: {
        type: DataTypes.STRING,
        allowNull: true
      },
      rank: {
        type: DataTypes.STRING, // Adjust if rank is numerical or a different type
        allowNull: true
      },
      bb_skype_day: {
        type: DataTypes.DATE, // Assuming this is a date; adjust as needed
        allowNull: true
      },
      bb: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      ga: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      home_com: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      kaimana: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      four_nine: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      }
    })
    return Accessories
  }