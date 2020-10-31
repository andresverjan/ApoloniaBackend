module.exports = (sequelize, Sequelize) => {
  const Mascara = sequelize.define("mascara", {
    nombre: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    },
    createdBy: {
      type: Sequelize.STRING
    }
  });
  return Mascara;
};