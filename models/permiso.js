module.exports = (sequelize, Sequelize) => {
    const Permiso = sequelize.define("permiso", {
      version: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      url_menu: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      MCA_ACTIVO: {
        type: Sequelize.STRING
      },
      EMPRESA_ID: {
        type: Sequelize.INTEGER
      },
      IDIOMA_ID: {
        type: Sequelize.INTEGER
      },
      applicationId: {
        type: Sequelize.INTEGER
      },
      orden: {
        type: Sequelize.INTEGER
      }
    },
    {
      freezeTableName: true
    });
    return Permiso;
  };