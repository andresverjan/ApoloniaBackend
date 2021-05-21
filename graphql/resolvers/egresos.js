const db = require('../../models');
const helpers = require('../../helpers');
const Egresos = db.egresos;

module.exports = {
  egresos: async (args) => {
    let where = {};
    if (args.filter) {
      where = helpers.getFilterFromObject(args.filter);
    }
    try {
      return await Egresos.findAll(where);
    } catch (error) {
      throw error;
    }
  },
};
