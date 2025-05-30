module.exports = (sequelize, DataTypes) => {
    const CustomerPastVisitHistory = sequelize.define('CustomerPastVisitHistory', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      visit_date: {
        type: DataTypes.STRING,
        allowNull: true
      },
      applicable: {
        type: DataTypes.STRING, // Use STRING or TEXT depending on the expected content
        allowNull: true
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      total_sales: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      total_gross_profit: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      total_purchase_price: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    })
    return CustomerPastVisitHistory
  }