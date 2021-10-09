module.exports = (sequelize, Sequelize) => {
  const EvolucionesEsterilizacionSchema = sequelize.define(
    "Evoluciones_Esterilizacion",
    { 
      evolucionId: {
        type: Sequelize.INTEGER,
      },                
      pacienteId: {
        type: Sequelize.INTEGER,
      },
      itemIdEsterilizacion: {
        type: Sequelize.INTEGER,
      },
      observaciones: {
        type: Sequelize.STRING,
      },   
    },
    {
      freezeTableName: true,
    }
  );
  return EvolucionesEsterilizacionSchema;
};
