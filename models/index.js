const dbConfig = require("../db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("../models/tutorial")(sequelize, Sequelize);
db.etiquetas = require("../models/etiquetas")(sequelize, Sequelize);
db.tipocampos = require("../models/tipocampos")(sequelize, Sequelize);
db.mascara     = require("../models/mascara")(sequelize, Sequelize);
db.application = require("../models/applications")(sequelize, Sequelize);
db.campo = require("../models/campos")(sequelize, Sequelize);
module.exports = db;