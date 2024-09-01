const config    = require("../config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  dialect:  config.db.dialect,
  host:     config.db.host
})

const db = {}
db.User           = require("./User")(sequelize, Sequelize.DataTypes);
db.Profile           = require("./Profile")(sequelize, Sequelize.DataTypes);
db.Customer           = require("./Customer")(sequelize, Sequelize.DataTypes);
db.Sales           = require("./Sales")(sequelize, Sequelize.DataTypes);

db.Chat           = require("./Chat")(sequelize, Sequelize.DataTypes);
db.Contact           = require("./Contact")(sequelize, Sequelize.DataTypes);
db.File           = require("./File")(sequelize, Sequelize.DataTypes);
db.Group           = require("./Group")(sequelize, Sequelize.DataTypes);
db.Inbox           = require("./Inbox")(sequelize, Sequelize.DataTypes);
db.Setting           = require("./Setting")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db