module.exports = (sequelize, DataTypes) => {
    const Camera = sequelize.define('Camera', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
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
      model_number: {
        type: DataTypes.STRING,
        allowNull: true
      },
      purchase_price: {
        type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale based on your needs
        allowNull: true
      },
      rank: {
        type: DataTypes.STRING, // Adjust if rank is numerical or a different type
        allowNull: true
      },
      assessment_date: {
        type: DataTypes.STRING, // Use DATE for date fields; change to DATEONLY if time is not needed
        allowNull: true
      },
      orchestra: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      },
      yahoo_auctions_wholesale: {
        type: DataTypes.STRING, // Adjust if the data type is different
        allowNull: true
      }
    })
    return Camera
  }