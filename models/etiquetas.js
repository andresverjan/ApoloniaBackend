module.exports = (sequelize, Sequelize) => {
  const Etiquetas = sequelize.define("etiquetas", {
    NOMBRE: {
      type: Sequelize.STRING,
    },
    DESCRIPCION: {
      type: Sequelize.STRING,
    },
    LABEL: {
      type: Sequelize.STRING,
    },
    IDIOMA_ID: {
      type: Sequelize.STRING,
    },
  });
  return Etiquetas;
};
