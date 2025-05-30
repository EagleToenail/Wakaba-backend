const config    = require("../config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  dialect:  config.db.dialect,
  host:     config.db.host
})

const db = {}
db.User               = require("./User")(sequelize, Sequelize.DataTypes);
db.Profile            = require("./Profile")(sequelize, Sequelize.DataTypes);
db.Customer           = require("./Customer")(sequelize, Sequelize.DataTypes);
db.CustomerPastVisitHistory           = require("./CustomerPastVisitHistory")(sequelize, Sequelize.DataTypes);
db.Sales              = require("./Sales")(sequelize, Sequelize.DataTypes);

db.Chat               = require("./Chat")(sequelize, Sequelize.DataTypes);
db.Contact            = require("./Contact")(sequelize, Sequelize.DataTypes);
db.File               = require("./File")(sequelize, Sequelize.DataTypes);
db.Group              = require("./Group")(sequelize, Sequelize.DataTypes);
db.Inbox              = require("./Inbox")(sequelize, Sequelize.DataTypes);
db.Setting            = require("./Setting")(sequelize, Sequelize.DataTypes);
db.WorkingTime        = require("./WorkingTime")(sequelize, Sequelize.DataTypes);
db.Product1           = require("./Product1")(sequelize, Sequelize.DataTypes);
db.Product2           = require("./Product2")(sequelize, Sequelize.DataTypes);
db.Product3           = require("./Product3")(sequelize, Sequelize.DataTypes);
db.Product4           = require("./Product4")(sequelize, Sequelize.DataTypes);
db.Inquery            = require("./Inquiry")(sequelize, Sequelize.DataTypes);
db.Scheduler            = require("./Scheduler")(sequelize, Sequelize.DataTypes);
db.PreciousMetalsPrice           = require("./PreciousMetalsPrice")(sequelize, Sequelize.DataTypes);

db.Vendor                   = require("./Vendor")(sequelize, Sequelize.DataTypes);
db.Master                   = require("./Master")(sequelize, Sequelize.DataTypes);
db.SafeMoney                   = require("./SafeMoney")(sequelize, Sequelize.DataTypes);
db.CashRegister                   = require("./CashRegister")(sequelize, Sequelize.DataTypes);


// db.WithdrawalBankATMMessage              = require("./WithdrawalBankATMMessage")(sequelize, Sequelize.DataTypes);
// db.WithdrawalVariousPurchaseMessage              = require("./WithdrawalVariousPurchaseMessage")(sequelize, Sequelize.DataTypes);
// db.WithdrawalApplyMessage              = require("./WithdrawalApplyMessage")(sequelize, Sequelize.DataTypes);
// db.OnSitePurchaseMessage              = require("./OnSitePurchaseMessage")(sequelize, Sequelize.DataTypes);
// db.DisposalPermissionMessage              = require("./DisposalPermissionMessage")(sequelize, Sequelize.DataTypes);

db.TodoMessage              = require("./TodoMessage")(sequelize, Sequelize.DataTypes);
db.GeneralChatMessage              = require("./GeneralChatMessage")(sequelize, Sequelize.DataTypes);
db.StoreChatMessage              = require("./StoreChatMessage")(sequelize, Sequelize.DataTypes);
db.PurchaseToRShopMessage              = require("./PurchaseToRShopMessage")(sequelize, Sequelize.DataTypes);


db.StampInterestRate              = require("./StampInterestRate")(sequelize, Sequelize.DataTypes);
db.StampSheet              = require("./StampSheet")(sequelize, Sequelize.DataTypes);
db.StampPasting              = require("./StampPasting")(sequelize, Sequelize.DataTypes);
db.StampRose              = require("./StampRose")(sequelize, Sequelize.DataTypes);
db.StampPack              = require("./StampPack")(sequelize, Sequelize.DataTypes);
db.StampCard              = require("./StampCard")(sequelize, Sequelize.DataTypes);
db.StampsTransaction   = require("./StampsTransaction")(sequelize, Sequelize.DataTypes);

db.Coin   = require("./Coin")(sequelize, Sequelize.DataTypes);
db.Bill   = require("./Bill")(sequelize, Sequelize.DataTypes);
db.Bill   = require("./Bill")(sequelize, Sequelize.DataTypes);
db.CoinAndBillExchange = require("./CoinAndBillExchange")(sequelize, Sequelize.DataTypes);
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db