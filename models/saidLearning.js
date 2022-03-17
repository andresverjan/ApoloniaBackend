module.exports = (sequelize, Sequelize) => {
    const Said = sequelize.define("saidLearning", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nombreAnimal: {
        type: Sequelize.STRING
      },
      nombreDueno: {
        type: Sequelize.STRING
      },
      Raza: {
        type: Sequelize.STRING
      },
      NumIdentificacion: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      sectorVivienda: {
        type: Sequelize.INTEGER
      },
      fechaNacimiento: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.INTEGER
      },
      eliminado: {
        type: Sequelize.INTEGER
      }
    });
    return Said;
  };