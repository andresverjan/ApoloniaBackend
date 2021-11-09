module.exports = (sequelize, Sequelize) => {
  const Empresa = sequelize.define(
    'EMPRESA',
    {
      codigo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },



      primaryColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secondaryColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accentColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      warnColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      urlLogo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  return Empresa;
};
