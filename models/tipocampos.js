module.exports = (sequelize, Sequelize) => {
  const TiposCampos = sequelize.define("tipocampos", {
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
  return TiposCampos;
};