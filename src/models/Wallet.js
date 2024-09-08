module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      shipping_address: {
        type: DataTypes.STRING, // Adjust data type if necessary
        allowNull: true
      },
      shipping_date: {
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if time is not needed
        allowNull: true
      },
      number: {
        type: DataTypes.STRING, // Assuming it's a string; adjust if it's a numeric value
        allowNull: true
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: true
      },
      product_name: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING, // Assuming this is a date; adjust as needed
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
      girasol: {
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
    return Wallet
  }