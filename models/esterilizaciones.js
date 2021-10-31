module.exports = (sequelize, Sequelize) => {
  const esterilizacion = sequelize.define(
    'esterilizaciones',
    {
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
      /*dispMed: {
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
      observ: {
        type: Sequelize.STRING,
      },
      disponible: {
        type: Sequelize.BOOLEAN,
      },
      cedulaPaciente: {
        type: Sequelize.INTEGER,
      }
    },
    {
      freezeTableName: true,
    }
  );
  return esterilizacion;
};
