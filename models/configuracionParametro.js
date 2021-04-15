module.exports = (sequelize, Sequelize) => {
    const ConfiguracionParametros = sequelize.define("ConfiguracionParametros", {
      GrupoParametro: {
        type: Sequelize.STRING,
      },
      NombreParametro: {
        type: Sequelize.STRING,
      },
      Valor: {
        type: Sequelize.STRING,
      },
      EmpresaID: {
        type: Sequelize.STRING,
      },
      Observaciones: {
        type: Sequelize.STRING,
      }
    },
    {
      freezeTableName: true
    });
  
    return ConfiguracionParametros;
  };