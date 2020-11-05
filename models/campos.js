const Application = require("../models/applications.js");

module.exports = (sequelize, Sequelize) => {
    const Campo = sequelize.define("campos", {
      nombre: {
        type: Sequelize.STRING
      },
      tipoDato: {
        type: Sequelize.STRING
      },
      tipoCampo: {
        type: Sequelize.STRING
      },
      requerido: {
        type: Sequelize.BOOLEAN
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      orden: {
        type: Sequelize.STRING
      },
      mascara: {
        type: Sequelize.DATE
      },
      minLength: {
        type: Sequelize.INTEGER
      },
      maxLength: {
        type: Sequelize.INTEGER
      },
      buscador: {
        type: Sequelize.BOOLEAN
      },
      verlist: {
        type: Sequelize.BOOLEAN
      },
      applicationId: {
        type: Sequelize.INTEGER,
        references: {
          model: Application, // 'Movies' would also work
          key: 'id'
        }
      }
    });
    
    Application.hasMany(Campo, {//Application.
        foreignKey: 'applicationId',
        as: "campos",
        sourceKey: 'id'
    });

    Campo.belongsTo(Application, {
        foreignKey: 'applicationId',
        as: "applications",
        targetKey: 'id',
        onDelete: 'CASCADE'
    });

    return Campo;
};