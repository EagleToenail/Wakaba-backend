module.exports = (sequelize, DataTypes) => {
    const Bag = sequelize.define('Bag', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      shipping_address: {
        type: DataTypes.STRING, // Adjust the type based on the actual data
        allowNull: true
      },
      shipping_date: {
        type: DataTypes.STRING, // Adjust based on the actual format
        allowNull: true
      },
      number: {
        type: DataTypes.STRING, // Assuming number is a string; adjust if it's an integer
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
        type: DataTypes.STRING, // Adjust if rank is a number or different type
        allowNull: true
      },
      purchase_price: {
        type: DataTypes.FLOAT, // Assuming monetary value, adjust if needed
        allowNull: true
      },
      bb_skype_date: {
        type: DataTypes.STRING, // Adjust based on the actual format
        allowNull: true
      },
      bb: {
        type: DataTypes.STRING, // Adjust based on actual data type
        allowNull: true
      },
      ga: {
        type: DataTypes.STRING, // Adjust based on actual data type
        allowNull: true
      },
      home_com: {
        type: DataTypes.STRING, // Adjust based on actual data type
        allowNull: true
      },
      kaimana: {
        type: DataTypes.STRING, // Adjust based on actual data type
        allowNull: true
      },
      four_nine: {
        type: DataTypes.STRING, // Adjust based on actual data type
        allowNull: true
      }
    })
    return Bag
  }