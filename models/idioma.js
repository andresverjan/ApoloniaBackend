module.exports = (sequelize, Sequelize) => {
  const Idiomas = sequelize.define("idiomas", {
    NOMBRE_IDIOMA: {
      type: Sequelize.STRING
    },
    SHORT_NAME: {
      type: Sequelize.STRING
    },
    BANDERA: {
      type: Sequelize.BOOLEAN
    }
  });
  return Idiomas;
};