const db = require('../../models');
const EvolucionesLaboratorios = db.evolucionesLaboratorios;
const helpers = require('../../helpers');

module.exports = {
  evolucionesLaboratorios: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObject(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return list = await EvolucionesLaboratorios.findAll(where);
    } catch (error) {
      throw error;
    }
  },
  createEvolucionesLaboratorios: async (args) => {
    try {
      console.log(args);
      const _resp = await EvolucionesLaboratorios.create(args.evolucionesLaboratorios).then((data) => {
        console.log(data);
        return data;
      });
      return _resp;
    } catch (error) {
      throw error;
    }
  },
};
