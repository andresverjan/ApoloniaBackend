module.exports = (sequelize, Sequelize) => {
  const Esterilizacion = sequelize.define(
    'Esterilizacion',
    {
      /*T27Codigo: {
        type: Sequelize.STRING,
      },*/
      T27Fecha: {
        type: Sequelize.DATE,
      },
      sede: {
        type: Sequelize.STRING,
      },
      motivo: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.STRING,
      },
      esporas: {
        type: Sequelize.STRING,
      },
      dispMed: {
        type: Sequelize.STRING,
      },
      tipEmp: {
        type: Sequelize.STRING,
      },
      /*T27Campo9: {
        type: Sequelize.STRING,
      },*/
      timeMin: {
        type: Sequelize.INTEGER,
      },
      temper: {
        type: Sequelize.INTEGER,
      },
      presion: {
        type: Sequelize.INTEGER,
      },
      /*T27Campo24: {
        type: Sequelize.STRING,
      },*/
      observ: {
        type: Sequelize.STRING,
      },
      cantidad: {
        type: Sequelize.INTEGER,
      }/*,
      T27Auditoria: {
        type: Sequelize.STRING,
      },
      T27Consecutivo: {
        type: Sequelize.INTEGER,
      },
      CedulaPaciente: {
        type: Sequelize.STRING,
      },
      disponible: {
        type: Sequelize.STRING,
      },*/
    },
    {
      freezeTableName: true,
    }
  );
  return Esterilizacion;
};
