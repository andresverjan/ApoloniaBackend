module.exports = (sequelize, Sequelize) => {
  const Campo = sequelize.define("applicationFieldsConfig", {
    nombre: {
      type: Sequelize.STRING,
    },
    nombreUi: {
      type: Sequelize.STRING,
    },
    tipoDato: {
      type: Sequelize.STRING,
    },
    requerido: {
      type: Sequelize.BOOLEAN,
    },
    visible: {
      type: Sequelize.BOOLEAN,
    },
    orden: {
      type: Sequelize.INTEGER,
    },
    minLength: {
      type: Sequelize.INTEGER,
    },
    maxLength: {
      type: Sequelize.INTEGER,
    },
    buscador: {
      type: Sequelize.BOOLEAN,
    },
    verList: {
      type: Sequelize.BOOLEAN,
    },
    mascaraId: {
      type: Sequelize.INTEGER,
    },
  });

  return Campo;
};
