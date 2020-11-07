const Application = require("./applications.js");
const TiposCampos = require("./tipocampos.js");
const Mascara = require("./mascara.js");

module.exports = (sequelize, Sequelize) => {
    const Campo = sequelize.define("applicationFieldsConfig", {
      nombre: {
        type: Sequelize.STRING
      },
      nombreUi: {
        type: Sequelize.STRING
      },
      tipoDato: {
        type: Sequelize.STRING
      },
      /*tipoCampoId: {
        type: Sequelize.INTEGER,
        references: {
          model: TiposCampos,
          key: 'id'
        }
      },*/
      requerido: {
        type: Sequelize.BOOLEAN
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      orden: {
        type: Sequelize.STRING
      },
      /*mascaraId: {
        type: Sequelize.INTEGER,
        references: {
          model: Mascara,
          key: 'id'
        }
      },*/
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
      }
    });

    return Campo;
};