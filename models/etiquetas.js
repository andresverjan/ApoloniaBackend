module.exports = (sequelize, Sequelize) => {
  const Etiquetas = sequelize.define("etiquetas", {
    NOMBRE: {
      type: Sequelize.STRING
    },
    DESCRIPCION: {
      type: Sequelize.STRING
    },
    LABEL: {
      type: Sequelize.BOOLEAN
    },
    IDIOMA_ID: {
      type: Sequelize.BOOLEAN
    }
  });
  return Etiquetas;
};