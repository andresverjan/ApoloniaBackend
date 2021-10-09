const db = require('../../models');
const EvolucionesRemision = db.evolucionesRemision;
const helpers = require('../../helpers');

module.exports = {
  evolucionesRemision: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObject(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return list = await EvolucionesRemision.findAll(where);
    } catch (error) {
      throw error;
    }
  },
  createEvolucionesRemision: async (args) => {
    try {
      console.log(args);
      const _resp = await EvolucionesRemision.create(args.evolucionesRemision).then((data) => {
        console.log(data);
        return data;
      });
      return _resp;
    } catch (error) {
      throw error;
    }
  },
};
