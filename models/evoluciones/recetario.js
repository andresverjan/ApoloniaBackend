module.exports = (sequelize, Sequelize) => {
  const EvolucionesRecetarioSchema = sequelize.define(
    "Evoluciones_Recetario",
    { 
      evolucionId: {
        type: Sequelize.INTEGER,
      },                
      pacienteId: {
        type: Sequelize.INTEGER,
      },
      medicamentoId: {
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
  return EvolucionesRecetarioSchema;
};
