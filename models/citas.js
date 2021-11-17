module.exports = (sequelize, Sequelize) => {
  const CitasSchema = sequelize.define(
    "cita",
    {
      title: {
        type: Sequelize.STRING,
      },
      start: {
        type: Sequelize.DATE,
      },
      end: {
        type: Sequelize.DATE,
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
      servicioId: {
        type: Sequelize.INTEGER,
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return CitasSchema;
};
