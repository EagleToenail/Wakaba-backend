module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('Sales', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        no:                          DataTypes.STRING,
        date:                        DataTypes.STRING,
        purchasing_manager:          DataTypes.STRING,
        customer_name:               DataTypes.STRING,
        katakana_name:               DataTypes.STRING,
        telephone_number:            DataTypes.STRING,
        address:                     DataTypes.TEXT,
        visit_type:                  DataTypes.STRING,
        brand_type:                  DataTypes.STRING,
        // store_name:                  DataTypes.STRING,
        // card_distribution:           DataTypes.STRING,
        // card_collection:             DataTypes.STRING,
        product_type_one:            DataTypes.STRING,
        product_type_two:            DataTypes.STRING,
        merchandise:                 DataTypes.STRING,
        number:                      DataTypes.INTEGER,
        gold_type:                   DataTypes.STRING,
        g_face_value:                DataTypes.DECIMAL(15, 2),
        purchase_amount:             DataTypes.DECIMAL(15, 2),
        sales_amount:                DataTypes.DECIMAL(15, 2),
        shipping_cost:               DataTypes.DECIMAL(15, 2),//new
        gross_profit:                DataTypes.DECIMAL(15, 2),
        wholesale_to:                DataTypes.STRING,
        wholesale_date:              DataTypes.STRING,
        deposit_date:                DataTypes.STRING,
        single_day_purchase_amount:  DataTypes.DECIMAL(15, 2),
        gross_profit_for_day:        DataTypes.DECIMAL(15, 2),
        gross_profit_for_month:      DataTypes.DECIMAL(15, 2),
        valut_addition:              DataTypes.DECIMAL(15, 2),
        remaining_balance:           DataTypes.INTEGER,
        telephone_inquiry:           DataTypes.INTEGER,
        store_visit:                 DataTypes.INTEGER,
        signed_contract:             DataTypes.STRING,
        no_contract:                 DataTypes.STRING,
        inquiry:                     DataTypes.STRING,
        keep_in_custody:             DataTypes.STRING,
        remarks:                     DataTypes.STRING,
        remark_two:                  DataTypes.STRING,
        batteries:                   DataTypes.STRING,
        month:                       DataTypes.STRING,
        state_flage: {
            type: DataTypes.ENUM,
            values: ['blue', 'orange', 'gray', 'purple', 'green'], // Enum values
        },

    })
    // Sales.associate = function (models) {
    //   Sales.belongsTo(models.Company)
    // }
    return Sales
}