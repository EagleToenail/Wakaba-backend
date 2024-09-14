module.exports = (sequelize, DataTypes) => {
    const MasterModel = sequelize.define('MasterModel', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Common fields
        shipping_address: DataTypes.STRING,
        shipping_date: DataTypes.DATE, // Changed from STRING to DATE
        number: DataTypes.STRING,
        product_name: DataTypes.STRING,
        model_number: DataTypes.STRING,
        purchase_price: DataTypes.DECIMAL(15, 2),
        quantity: DataTypes.INTEGER,
        assessment_date: DataTypes.DATE, // Changed from STRING to DATE
        remarks: DataTypes.TEXT,
        // Fields from Sales
        trading_date: DataTypes.DATE, // Changed from STRING to DATE
        purchase_staff: DataTypes.STRING,
        visit_type: DataTypes.STRING,
        brand_type: DataTypes.STRING,
        store_name: DataTypes.STRING,
        product_type_one: DataTypes.STRING,
        product_type_two: DataTypes.STRING,
        metal_type: DataTypes.STRING,
        price_per_gram: DataTypes.DECIMAL(15, 2),
        purchase_price: DataTypes.DECIMAL(15, 2),
        sales_amount: DataTypes.DECIMAL(15, 2),
        shipping_cost: DataTypes.DECIMAL(15, 2),
        gross_profit: DataTypes.DECIMAL(15, 2),
        wholesale_buyer: DataTypes.STRING,
        wholesale_date: DataTypes.DATE, // Changed from STRING to DATE
        payment_date: DataTypes.DATE, // Changed from STRING to DATE
        signature: DataTypes.STRING,
        // Fields from PreciousMetals
        gold_type: DataTypes.STRING,
        gross_weight: DataTypes.FLOAT,
        bullion_weight: DataTypes.FLOAT,
        book_assessment_net_japan: DataTypes.STRING,
        line_color_stone_bank: DataTypes.STRING,
        real_assessment_color_stone_bank: DataTypes.STRING,
        line_four_nine: DataTypes.STRING,
        book_assessment_four_nine: DataTypes.STRING,
        kaimana_assessment_date: DataTypes.DATE, // Changed from STRING to DATE
        line_kaimana: DataTypes.STRING,
        original_assessment_kaimana: DataTypes.STRING,
        online_ssessment_date_quote: DataTypes.DATE, // Changed from STRING to DATE
        // Fields from Clock
        model_number_one: DataTypes.STRING,
        model_number_two: DataTypes.STRING,
        automatic_quartz: DataTypes.STRING,
        movable: DataTypes.STRING,
        tester: DataTypes.STRING,
        box_guarantee: DataTypes.STRING,
        skype_date: DataTypes.DATE, // Changed from STRING to DATE
        bb: DataTypes.STRING,
        ga: DataTypes.STRING,
        belmond: DataTypes.STRING,
        homecom: DataTypes.STRING,
        kaimana: DataTypes.STRING,
        four_nine: DataTypes.STRING,
        yahoo_auction: DataTypes.STRING,
        // Fields from Bag
        manufacturer: DataTypes.STRING,
        model_number: DataTypes.STRING,
        rank: DataTypes.STRING,
        bb_skype_date: DataTypes.DATE, // Changed from STRING to DATE
        // Fields from Wallet
        bb_skype_day: DataTypes.DATE, // Changed from STRING to DATE
        girasol: DataTypes.STRING,
        // Fields from Accessories
        wakaba_number: DataTypes.STRING,
        product_details: DataTypes.STRING,
        // Fields from Camera
        product_name: DataTypes.STRING,
        purchase_price: DataTypes.DECIMAL(10, 2),
        rank: DataTypes.STRING,
        assessment_date: DataTypes.DATE, // Changed from STRING to DATE
        orchestra: DataTypes.STRING,
        yahoo_auctions_wholesale: DataTypes.STRING,
        // Fields from Antique
        nap_cat: DataTypes.STRING,
        art: DataTypes.STRING,
        yoshioka_art: DataTypes.STRING,
        sword_sato: DataTypes.STRING,
        yahoo_auctions: DataTypes.STRING,
        // Fields from WesternLiquor
        kinds: DataTypes.STRING,
        brand: DataTypes.STRING,
        capacity: DataTypes.STRING,
        frequency: DataTypes.STRING,
        yahoo_auctions_highest_price: DataTypes.DECIMAL(15, 2),
        auction_id: DataTypes.STRING,
        gold_liquor: DataTypes.STRING,
        linksus: DataTypes.STRING,
        // Fields from MusicalInstrument
        remarks: DataTypes.TEXT,
        yahoo_auctions_wholesale: DataTypes.DECIMAL(15, 2),
        // Fields from OldCoin
        wataru_shoji: DataTypes.STRING,
        omiya: DataTypes.STRING,
        // Fields from Kimono
        hanamori: DataTypes.STRING,
        // Fields from SmartPhoneAndTablet
        yahoo_auctions_highest_price: DataTypes.DECIMAL(15, 2),
        pathtech: DataTypes.STRING
    });

    return MasterModel;
};
