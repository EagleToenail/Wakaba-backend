module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('Sales', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        trading_date:                DataTypes.STRING,//Trading Date
        purchase_staff:              DataTypes.STRING,//Purchase Staff
        customer_id:                 DataTypes.INTEGER,//connect to customerlist(fullname,..,phonenumber,address)
        visit_type:                  DataTypes.STRING,
        brand_type:                  DataTypes.STRING,
        store_name:                  DataTypes.STRING,
        product_type_one:            DataTypes.STRING,
        product_type_two:            DataTypes.STRING,
        product:                     DataTypes.STRING,
        quantity:                    DataTypes.INTEGER,
        metal_type:                  DataTypes.STRING,//in case of metal
        price_per_gram:              DataTypes.DECIMAL(15, 2),//in case of metal
        purchase_price:              DataTypes.DECIMAL(15, 2),
        sales_amount:                DataTypes.DECIMAL(15, 2),
        shipping_cost:               DataTypes.DECIMAL(15, 2),//new
        gross_profit:                DataTypes.DECIMAL(15, 2),//Automatically calculate (sales amount -(purchase price - shipping cost))
        wholesale_buyer:             DataTypes.STRING,
        wholesale_date:              DataTypes.STRING,
        payment_date:                DataTypes.STRING,
        signature:                   DataTypes.STRING,

    })
    Sales.associate = (models) => {
        Sales.belongsTo(models.Customer, { foreignKey: 'customer_id'}); 
      };
    return Sales
}