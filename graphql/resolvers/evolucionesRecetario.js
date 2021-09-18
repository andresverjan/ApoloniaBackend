const db = require('../../models');
const EvolucionesRecetario = db.evolucionesRecetario;
const helpers = require('../../helpers');

module.exports = {
  evolucionesRecetario: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObject(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return list = await EvolucionesRecetario.findAll(where);
    } catch (error) {
      throw error;
    }
  },
  createEvolucionesRecetario: async (args) => {
    try {
      console.log(args);
      const _resp = await EvolucionesRecetario.create(args.evolucionesRecetario).then((data) => {
        console.log(data);
        return data;
      });
      return _resp;
    } catch (error) {
      throw error;
    }
  },
};
