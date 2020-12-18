module.exports = (sequelize, Sequelize) => {
  //TODO: actualizar el modelo

  const CitasSchema = sequelize.define(
    "cita",
    {
      title: {
        type: Sequelize.STRING,
      },
      start: {
        type: Sequelize.STRING,
      },
      end: {
        type: Sequelize.STRING,
      },
      odontologoId: {
        type: Sequelize.INTEGER,
      },
      horaIngreso: {
        type: Sequelize.STRING,
      },
      horaSalida: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      pacienteId: {
        type: Sequelize.INTEGER,
      },
      //TODO: RELACIÓN
      servicioId: {
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
  return CitasSchema;
};
