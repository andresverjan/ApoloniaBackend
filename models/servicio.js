module.exports = (sequelize, Sequelize) => {
    const Servicio = sequelize.define("servicio", {
      nombre: {
        type: Sequelize.STRING
      },

      description: {
        type: Sequelize.STRING
      },

      duracion: {
        type: Sequelize.INTEGER
      },
      
      EMPRESA_ID: {
        type: Sequelize.INTEGER,
        default: 1
      }
    }/*,
    {
      freezeTableName: true
    }*/);
    return Servicio;
  };