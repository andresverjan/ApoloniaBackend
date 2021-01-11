const db = require("../../models");
const Servicios = db.servicio;

const helpers = require("../../helpers");

module.exports = {
  servicios: async (args) => {
    try {
      let where = {};
      console.log("!!!!!!!!", args);
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObject(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }

      return (list = await Servicios.findAll(where));
    } catch (error) {
      throw error;
    }
  },
  servicioById: async (args) => {
    const { id } = args;

    return Servicios.findOne({ where: { id } });
  },
};
