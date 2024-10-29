
module.exports = (sequelize, DataTypes) => {
    const Master = sequelize.define('Master', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Common fields-----------------------------
        invoiceID: DataTypes.STRING(10),
        invoice_ids: DataTypes.STRING(20),
        shipping_ids: DataTypes.STRING(20),
        shipping_address: {
            type: DataTypes.STRING, // 
            defaultValue:''
          },
        trading_date: DataTypes.STRING(15), // the date that the shop bought the items from customer
        assessment_date: DataTypes.STRING(15), // the date that the shop received assesment (estimate) from wholesaler vendor
        signature_date_time: DataTypes.STRING(30),
        shipping_date: DataTypes.STRING(15), // the date to send items to wholesaler
        expected_deposit_date: DataTypes.STRING(15),
        deposit_date: DataTypes.STRING(15), //the date that the payment from wholesaler confirmed
        number: DataTypes.STRING(20),
        product_name: DataTypes.STRING(50),
        comment:      DataTypes.TEXT,
        purchase_price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        remarks: DataTypes.TEXT,
        // Fields from Sales---------------------------------------
        customer_id:    DataTypes.STRING(15),
        purchase_staff: DataTypes.STRING(50),
        purchase_staff_id: DataTypes.STRING(10),
        store_name: DataTypes.STRING(50),
        product_type_one: DataTypes.STRING(50),
        product_type_two: DataTypes.STRING(50),
        product_type_three: DataTypes.STRING(50),
        product_type_four: DataTypes.STRING(50),
        metal_type: DataTypes.STRING(20),
        price_per_gram: DataTypes.INTEGER,
        sales_amount: DataTypes.INTEGER,
        shipping_cost: DataTypes.INTEGER,
        gross_profit: DataTypes.INTEGER,
        wholesale_buyer: DataTypes.STRING(50),
        wholesale_date: DataTypes.STRING(15), // Changed from STRING to DATE//no need
        payment_date: DataTypes.STRING(15), //  the date that the payment from wholesaler confirmed // no need
        signature: DataTypes.STRING(50),

        hearing: DataTypes.STRING(5),
        product_photo: {
          type:  DataTypes.STRING(50),
          defaultValue: '',
        },
        reason_application: DataTypes.STRING(50),
        interest_rate: DataTypes.STRING(5),
        product_price: DataTypes.INTEGER,
        highest_estimate_vendor: DataTypes.STRING(20),
        highest_estimate_price: DataTypes.INTEGER,
        number_of_vendor: DataTypes.STRING(5),
        supervisor_direction: DataTypes.STRING(50),
        purchase_result: DataTypes.STRING(20),           

        invoice_status: {
          type: DataTypes.ENUM,
          values: ['追加','編集'],
          defaultValue: '追加',
      },
        product_status: {
            type: DataTypes.ENUM,
            values: ['査定中','お預かり','承認待ち','承認された','買取済','発送中','約定済','オークション出品済','オークション発送済','廃棄','基準外','返品・返金'],
            defaultValue: '査定中',
        },
        shipping_status: {
            type: DataTypes.ENUM,
            values: ['申請中','発送中','約定済', '約定済＋返送依頼','返送依頼','入金待ち','入金済'],
            defaultValue: '申請中',
        },
        worthy_flag: {
          type: DataTypes.ENUM,
          values: ['yes','no'],
          defaultValue: 'yes',
        },
        fixed_checkout: {
          type: DataTypes.ENUM,
          values:['real','unreal'],
          defaultValue: 'real',
        } ,//used to show how the item is checked out. Wholesaler name, Auction, Discard, Cancelled, etc will be here in Japanese
        product_detail: DataTypes.TEXT,
        //shipping related data---------------------------------
        shipper: DataTypes.STRING(30),
        payment_staff: DataTypes.STRING(30),
        assessment_amount: DataTypes.STRING(20),
        //yahoo auction related data----------------------------
        successful_bider: DataTypes.STRING(50),
        auction_purchase_price: DataTypes.INTEGER,
        auction_bider_name: DataTypes.STRING(20),
        auction_bider_katakana_name: DataTypes.STRING(30),
        auction_bider_tel: DataTypes.STRING(20),
        auction_bider_address: DataTypes.STRING(50),
        auction_bider_evaluation: DataTypes.STRING(30),

        // Fields from PreciousMetals----------------------------
        gold_type: DataTypes.STRING(20),
        gross_weight: DataTypes.STRING(20),
        price_per_gram: DataTypes.STRING(20),
        // Fields from OldCoin-----------------------------------
        // Fields from Clock-------------------------------------
        model_number_one: DataTypes.STRING(20),
        model_number_two: DataTypes.STRING(20),
        action_type: DataTypes.STRING(20),
        movable: DataTypes.STRING(20),
        tester: DataTypes.STRING(20),
        box_guarantee: DataTypes.STRING(20),
        skype_date: DataTypes.STRING(15),
        // Fields from Bag--------------------------------------
        manufacturer: DataTypes.STRING(50),
        bb_skype_date: DataTypes.STRING(15), 
        // Fields from Wallet-----------------------------------
        bb_skype_day: DataTypes.STRING(15),
        // Fields from Accessories------------------------------
        wakaba_number: DataTypes.STRING(15),
        // Fields from Camera-----------------------------------
        rank: DataTypes.STRING(20),
        // Fields from Antique----------------------------------
        // Fields from WesternLiquor----------------------------
        kinds: DataTypes.STRING(15),
        brand: DataTypes.STRING(15),
        capacity: DataTypes.STRING(15),
        percent: DataTypes.STRING(15),
        yahoo_auctions_highest_price: DataTypes.INTEGER,
        auction_id: DataTypes.STRING(10),
        estimate_wholesaler: DataTypes.TEXT,
        final_estimate_wholesaler: DataTypes.TEXT,
        // Fields from MusicalInstrument-------------------------
        // Fields from Kimono------------------------------------
        // Fields from SmartPhoneAndTablet-----------------------
        // Vendors-----------------------------------------------
        entire_items_url: { 
            type:DataTypes.STRING(100),
            defaultValue: ''
        },
        document_url: {
          type: DataTypes.STRING(100),
          defaultValue: ''
        },
        notes: DataTypes.STRING(50),
        serial_number: DataTypes.STRING(10),
        customer_receipt: {
          type: DataTypes.ENUM,
          values:['0','1'],
          defaultValue: '0',
        } 
    });
    Master.associate = (models) => {
        Master.belongsTo(models.Customer, { foreignKey: 'customer_id'}); 
      };
    return Master;
};
