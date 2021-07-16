const db = require('../../models');
const Esterilizaciones = db.esterilizacion;
const helpers = require('../../helpers');

module.exports = {
  esterilizaciones: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObjectAllLike(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return (list = await Esterilizaciones.findAll(where));
    } catch (error) {
      throw error;
    }
  },
  updateEsterilizacion: async (args) => {
    try {
      return await Esterilizaciones.update(args.esterilizacion, {
        where: { id: args.esterilizacion.id },
      }).then((data) => {
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },
};
