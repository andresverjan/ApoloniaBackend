module.exports = (sequelize, Sequelize) => {
  const TiposPagos = sequelize.define("tipospagos", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
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
    },
    createdAt: {
      type: Sequelize.STRING
    }
  });
  return TiposPagos;
};