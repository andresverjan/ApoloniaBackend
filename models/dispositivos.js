module.exports = (sequelize, Sequelize) => {
    const Dispositivo = sequelize.define("dispositivosMedicos", {
      codigo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      EMPRESA_ID: {
        type: Sequelize.INTEGER
      }
    },
    {
      freezeTableName: true
    });
    return Dispositivo;
  };