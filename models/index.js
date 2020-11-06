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
db.comment = require("../models/comment")(sequelize, Sequelize);

db.tutorials.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

db.etiquetas    = require("../models/etiquetas")(sequelize, Sequelize);
db.tipocampos   = require("../models/tipocampos")(sequelize, Sequelize);
db.mascara      = require("../models/mascara")(sequelize, Sequelize);
db.application  = require("../models/applications")(sequelize, Sequelize);
db.campos       = require("../models/applicationFieldsConfig")(sequelize, Sequelize);

db.application.hasMany(db.campos, { as: "fields" });
db.campos.belongsTo(db.application, {
  foreignKey: "applicationId",
  as: "application",
});

db.tipocampos.hasMany(db.campos, { as: "fields" });
db.campos.belongsTo(db.tipocampos, {
  foreignKey: "tipocamposId",
  as: "tipocampos",
});

db.mascara.hasMany(db.campos, { as: "fields" });
db.campos.belongsTo(db.mascara, {
  foreignKey: "mascaraId",
  as: "mascara",
});

module.exports = db;


