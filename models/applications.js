module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define("applications", {
      nombre: {
        type: Sequelize.STRING
      },
      nombreTabla: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdBy: {
        type: Sequelize.STRING
      }
    });
    
    return Application;
  };