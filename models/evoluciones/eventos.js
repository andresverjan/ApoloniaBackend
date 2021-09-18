module.exports = (sequelize, Sequelize) => {
  const EvolucionesEventosAdversosSchema = sequelize.define(
    "Evoluciones_EventosAdversos",
    {      
      evolucionId: {
        type: Sequelize.INTEGER,
      }, 
      pacienteId: {
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      }, 
      observaciones: {
        type: Sequelize.STRING,
      },
      
    },
    {
      freezeTableName: true,
    }
  );
  return EvolucionesEventosAdversosSchema;
};
