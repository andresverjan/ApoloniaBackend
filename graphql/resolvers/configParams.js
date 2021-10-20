const db = require('../../models');
const ConfiguracionParametro = db.configuracionParametros;

module.exports = {
  configByParamGroup: async (args) => {
    const { GrupoParametro } = args;
    try {
      return (configParam = list =
        await ConfiguracionParametro.findAll({
          where: {
            GrupoParametro,
          },
        }));
    } catch (error) {
      throw error;
    }
  },
  updateParamGroup: async (args) => {
    const { configParam } = args;
    try {
      await ConfiguracionParametro.update(configParam, {
        where: {
          id: configParam.id,
        },
      }).then((data) => {
        console.log(data);
      });
      return `Grupo Parámetro con id = ${configParam.id} --> ACTUALIZADO`;
    } catch (error) {
      throw error;
    }
  },
};
