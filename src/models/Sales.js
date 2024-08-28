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
        purchasing_officer:          DataTypes.STRING,
        customer_name:               DataTypes.STRING,
        reading:                     DataTypes.STRING,
        telephone_number:            DataTypes.STRING,
        address:                     DataTypes.TEXT,
        visit_type:                  DataTypes.STRING,
        brand_type:                  DataTypes.STRING,
        store_name:                  DataTypes.STRING,
        card_distribution:           DataTypes.STRING,
        card_collection:             DataTypes.STRING,
        product_type_one:            DataTypes.STRING,
        product_type_two:            DataTypes.STRING,
        merchandise:                 DataTypes.STRING,
        number:                      DataTypes.INTEGER,
        Denomination:                DataTypes.STRING,
        g_face_value:                DataTypes.DECIMAL(15, 2),
        purchase_price:              DataTypes.DECIMAL(15, 2),
        sales_amount:                DataTypes.DECIMAL(15, 2),
        gross_profit:                DataTypes.DECIMAL(15, 2),
        wholesale_date:              DataTypes.STRING,
        deposit_date:                DataTypes.STRING,
        single_day_purchase_amount:  DataTypes.DECIMAL(15, 2),
        single_gross_profit:         DataTypes.DECIMAL(15, 2),
        current_month_gross_profit:  DataTypes.DECIMAL(15, 2),
        safe_deposit_extra:          DataTypes.DECIMAL(15, 2),
        valance:                     DataTypes.INTEGER,
        incoming_call:               DataTypes.INTEGER,
        visit:                       DataTypes.INTEGER,
        hitter:                      DataTypes.STRING,
        wholesaler:                  DataTypes.STRING,
        remarks:                     DataTypes.STRING,
        note_two:                    DataTypes.STRING,
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