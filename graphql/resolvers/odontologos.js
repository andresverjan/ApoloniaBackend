const db = require("../../models");
const Odontologo = db.odontologos;
const helpers = require("../../helpers");
module.exports = {
  odontologos: async (args) => {
    try {
      let where = {};

      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObjectAllLike(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return (list = await Odontologo.findAll(where));
    } catch (error) {
      throw error;
    }
  },
};
