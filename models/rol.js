module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define("rol", {
      version: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      MCA_ACTIVO: {
        type: Sequelize.STRING
      },
      MCA_SUPERUSUARIO: {
        type: Sequelize.STRING
      }
    },
    {
    freezeTableName: true
    });
    return Rol;
  };