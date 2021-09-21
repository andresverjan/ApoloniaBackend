const db = require('../../models');
const Proveedores = db.proveedores;

const helpers = require('../../helpers');

module.exports = {
  proveedores: async (args) => {
    try {
      let where = {};

      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObjectAllLike(
          args.filter,
        );
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(
          args.order,
        );
      }

      return (list = await Proveedores.findAll(where));
    } catch (error) {
      throw error;
    }
  },
};
