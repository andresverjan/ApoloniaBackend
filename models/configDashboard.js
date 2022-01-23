module.exports = (sequelize, Sequelize) => {
    const ConfigDashboard = sequelize.define("configDashboard", {
      codigo: {
        type: Sequelize.STRING,
      },
      titulo: {
        type: Sequelize.STRING,
      },
      Nombre: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      componenteTipo: {
        type: Sequelize.STRING,
      },
      color1: {
        type: Sequelize.STRING,
      },
      color2: {
        type: Sequelize.STRING,
      },
      color3: {
        type: Sequelize.STRING,
      },
      color4: {
        type: Sequelize.STRING,
      },
      orden: {
        type: Sequelize.STRING,
      },
      icono: {
        type: Sequelize.STRING,
      },
      visible: {
        type: Sequelize.STRING,
      }  
  },
    {
      freezeTableName: true
    });
  
    return ConfigDashboard;
  };