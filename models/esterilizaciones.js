module.exports = (sequelize, Sequelize) => {
  const Esterilizacion = sequelize.define(
    "Esterilizacion",
    {
      T27Codigo: {
        type: Sequelize.STRING,
      },
      T27Fecha: {
        type: Sequelize.DATE,
      },

      T27Campo9: {
        type: Sequelize.STRING,
      },

      T27Campo24: {
        type: Sequelize.STRING,
      },
      T27Auditoria: {
        type: Sequelize.STRING,
      },
      T27Consecutivo:{
          type: Sequelize.INTEGER,
      }
    },
    {
      freezeTableName: true,
    }
  );
  return Esterilizacion;
};
