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
};
