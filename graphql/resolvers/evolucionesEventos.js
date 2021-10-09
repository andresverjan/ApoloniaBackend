const db = require('../../models');
const EvolucionesEventos = db.evolucionesEventos;
const helpers = require('../../helpers');

module.exports = {
  evolucionesEventos: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObject(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return list = await EvolucionesEventos.findAll(where);
    } catch (error) {
      throw error;
    }
  },
  createEvolucionesEventos: async (args) => {
    try {
      console.log(args);
      const _resp = await EvolucionesEventos.create(args.evolucionesEventos).then((data) => {
        console.log(data);
        return data;
      });
      return _resp;
    } catch (error) {
      throw error;
    }
  },
};
