module.exports = (sequelize, Sequelize) => {
  const EvolucionesLaboratoriosSchema = sequelize.define(
    "Evoluciones_Laboratorios",
    { 
      evolucionId: {
        type: Sequelize.INTEGER,
      },           
      observaciones: {
        type: Sequelize.STRING,
      },
      pacienteId: {
        type: Sequelize.INTEGER,
      },
      especialistaId: {
        type: Sequelize.INTEGER,
      },      
    },
    {
      freezeTableName: true,
    }
  );
  return EvolucionesLaboratoriosSchema;
};
