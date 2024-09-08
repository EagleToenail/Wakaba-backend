module.exports = (sequelize, DataTypes) => {
    const Antique = sequelize.define('Antique', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      shipping_address: {
        type: DataTypes.STRING, // Adjust data type if necessary
        allowNull: true // Set to false if this field is required
      },
      shipping_date: {
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if time is not needed
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
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if time is not needed
        allowNull: true
      },
      nap_cat: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      art: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      yoshioka_art: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      sword_sato: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      yahoo_auctions: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      }
    })
    return Antique
  }