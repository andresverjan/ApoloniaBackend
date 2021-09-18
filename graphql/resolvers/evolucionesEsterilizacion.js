const db = require('../../models');
const EvolucionesEsterilizacion = db.evolucionesEsterilizacion;
const helpers = require('../../helpers');

module.exports = {
  evolucionesEsterilizacion: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObject(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return list = await EvolucionesEsterilizacion.findAll(where);
    } catch (error) {
      throw error;
    }
  },
  createEvolucionesEsterilizacion: async (args) => {
    try {
      console.log(args);
      const _resp = await EvolucionesEsterilizacion.create(args.evolucionesEsterilizacion).then((data) => {
        console.log(data);
        return data;
      });
      return _resp;
    } catch (error) {
      throw error;
    }
  },
};
