module.exports = (sequelize, Sequelize) => {
  const EvolucionesRemisionSchema = sequelize.define(
    "Evoluciones_Remision",
    { 
      evolucionId: {
        type: Sequelize.INTEGER,
      },     
      especialistaIdOrigen: {
        type: Sequelize.INTEGER,
      },
      especialistaIdDestino: {
        type: Sequelize.INTEGER,
      },     
      Observaciones: {
        type: Sequelize.STRING,
      },
      pacienteId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return EvolucionesRemisionSchema;
};
