const db = require("../../models");
const CitasHC = db.citashc;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");

module.exports = {
  getCitasHC: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObjectAllLike(args.filter);
      }
      if (args.order != null && args.order != undefined) {
          where.order = helpers.getOrderFromObject(args.order);
      }
      return (list = await CitasHC.findAll(where));
    } catch (error) {
      throw error;
    }
  },
};