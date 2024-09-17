module.exports = (sequelize, DataTypes) => {
    const MasterModel = sequelize.define('MasterModel', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Common fields-----------------------------
        shipping_address: DataTypes.STRING,
        shipping_date: DataTypes.STRING(15), // Changed from STRING to DATE
        number: DataTypes.STRING(20),
        product_name: DataTypes.STRING(50),
        model_number: DataTypes.STRING(10),
        purchase_price: DataTypes.DECIMAL(15, 2),
        quantity: DataTypes.INTEGER,
        assessment_date: DataTypes.STRING(15), // Changed from STRING to DATE
        remarks: DataTypes.TEXT,
        // Fields from Sales---------------------------------------
        trading_date: DataTypes.STRING(15), // Changed from STRING to DATE
        purchase_staff: DataTypes.STRING(50),
        visit_type: DataTypes.STRING(20),
        brand_type: DataTypes.STRING(20),
        store_name: DataTypes.STRING(50),
        product_type_one: DataTypes.STRING(50),
        product_type_two: DataTypes.STRING(50),
        product_type_three: DataTypes.STRING(50),
        product_type_four: DataTypes.STRING(50),
        metal_type: DataTypes.STRING(20),
        price_per_gram: DataTypes.DECIMAL(15, 2),
        purchase_price: DataTypes.DECIMAL(15, 2),//result price
        sales_amount: DataTypes.DECIMAL(15, 2),
        shipping_cost: DataTypes.DECIMAL(15, 2),
        gross_profit: DataTypes.DECIMAL(15, 2),
        wholesale_buyer: DataTypes.STRING(50),
        wholesale_date: DataTypes.STRING(15), // Changed from STRING to DATE
        payment_date: DataTypes.STRING(15), // Changed from STRING to DATE
        signature: DataTypes.STRING(50),

        hearing: DataTypes.STRING(5),
        product_photo: DataTypes.STRING(50),
        reason_application: DataTypes.STRING(50),
        interest_rate: DataTypes.STRING(5),
        product_price: DataTypes.DECIMAL(15, 2),
        highest_estimate_vendor: DataTypes.STRING(20),
        highest_estimate_price: DataTypes.DECIMAL(15, 2),
        number_of_vendor: DataTypes.STRING(5),
        supervisor_direction: DataTypes.STRING(50),
        purchase_result: DataTypes.STRING(20),           

        product_status:   DataTypes.STRING(20),
        fixed_checkout: DataTypes.STRING(20),//used to show how the item is checked out. Wholesaler name, Auction, Discard, Cancelled, etc will be here in Japanese
        depositeDate: DataTypes.STRING(15),
        product_detail: DataTypes.TEXT,
        // Fields from PreciousMetals--------------------------------------
        gold_type: DataTypes.STRING(20),
        gross_weight: DataTypes.FLOAT,
        bullion_weight: DataTypes.FLOAT,
            // book_assessment_net_japan: DataTypes.STRING,//vendor name
            // line_color_stone_bank: DataTypes.STRING,
            // real_assessment_color_stone_bank: DataTypes.STRING,
            // line_four_nine: DataTypes.STRING,
            // book_assessment_four_nine: DataTypes.STRING,
            // kaimana_assessment_date: DataTypes.STRING, 
            // line_kaimana: DataTypes.STRING,
            // original_assessment_kaimana: DataTypes.STRING,
            // online_ssessment_date_quote: DataTypes.STRING,
        // Fields from OldCoin----------------------------------------
            // wataru_shoji: DataTypes.STRING,
            // omiya: DataTypes.STRING,
        // Fields from Clock-----------------------------------------
        model_number_one: DataTypes.STRING(20),
        model_number_two: DataTypes.STRING(20),
        automatic_quartz: DataTypes.STRING(20),
        movable: DataTypes.STRING(20),
        tester: DataTypes.STRING(20),
        box_guarantee: DataTypes.STRING(20),
        skype_date: DataTypes.STRING(15),

            // bb: DataTypes.STRING,//vendor name
            // ga: DataTypes.STRING,
            // belmond: DataTypes.STRING,
            // homecom: DataTypes.STRING,
            // kaimana: DataTypes.STRING,
            // four_nine: DataTypes.STRING,
            // yahoo_auction: DataTypes.STRING,
        // Fields from Bag----------------------------------------
        manufacturer: DataTypes.STRING(50),
        model_number: DataTypes.STRING(20),
        rank: DataTypes.STRING(20),
        bb_skype_date: DataTypes.STRING(15), 
        // Fields from Wallet-----------------------------------
        bb_skype_day: DataTypes.STRING(15),
            // girasol: DataTypes.STRING,
        // Fields from Accessories-----------------------------------
        wakaba_number: DataTypes.STRING(15),
        product_details: DataTypes.STRING(15),
        // Fields from Camera-------------------------------
        product_name: DataTypes.STRING(50),
        purchase_price: DataTypes.DECIMAL(10, 2),
        rank: DataTypes.STRING(20),
        assessment_date: DataTypes.STRING(15), 
            // orchestra: DataTypes.STRING,
            // yahoo_auctions_wholesale: DataTypes.STRING,
        // Fields from Antique----------------------------------
            // nap_cat: DataTypes.STRING,
            // art: DataTypes.STRING,
            // yoshioka_art: DataTypes.STRING,
            // sword_sato: DataTypes.STRING,
            // yahoo_auctions: DataTypes.STRING,
        // Fields from WesternLiquor--------------------------
        kinds: DataTypes.STRING(15),
        brand: DataTypes.STRING(15),
        capacity: DataTypes.STRING(15),
        frequency: DataTypes.STRING(15),
        yahoo_auctions_highest_price: DataTypes.DECIMAL(15, 2),
        auction_id: DataTypes.STRING(10),
            //gold_liquor: DataTypes.STRING,
            //linksus: DataTypes.STRING,
        // Fields from MusicalInstrument--------------------------
        remarks: DataTypes.TEXT,
            //yahoo_auctions_wholesale: DataTypes.DECIMAL(15, 2),
        // Fields from Kimono------------------------------------
            //hanamori: DataTypes.STRING,
        // Fields from SmartPhoneAndTablet-------------------------------
            //yahoo_auctions_highest_price: DataTypes.DECIMAL(15, 2),
            //pathtech: DataTypes.STRING
        // Vendors-----------------------------------------------
        本査定ネットジャパン: DataTypes.STRING(50),
        LINE色石バンク: DataTypes.STRING(50),
        本査定色石バンク: DataTypes.STRING(50),
        LINEフォーナイン: DataTypes.STRING(50),
        本査定フォーナイン: DataTypes.STRING(50),
        カイマナ査定日: DataTypes.STRING(50),
        LINEカイマナ: DataTypes.STRING(50),
        本査定カイマナ: DataTypes.STRING(50),
        LINE査定日相場: DataTypes.STRING(50),
        ワタル商事: DataTypes.STRING(50),
        近江屋: DataTypes.STRING(50),
        ヤフオク: DataTypes.STRING(50),//yahoo auction
        BB: DataTypes.STRING(50),
        GA: DataTypes.STRING(50),
        ベルモンド: DataTypes.STRING(50),
        ホームコム: DataTypes.STRING(50),
        カイマナ: DataTypes.STRING(50),
        フォーナイン: DataTypes.STRING(50),
        ひるねこ: DataTypes.STRING(50),
        アート: DataTypes.STRING(50),
        吉岡美術: DataTypes.STRING(50),
        刀剣佐藤: DataTypes.STRING(50),
        ゴールドリカー: DataTypes.STRING(50),
        リンクサス: DataTypes.STRING(50),
        管弦屋: DataTypes.STRING(50),
        はなもり: DataTypes.STRING(50),
        バステック: DataTypes.STRING(50),
    });

    return MasterModel;
};
