const db = require('../../models');
const Esterilizaciones = db.esterilizaciones;
const helpers = require('../../helpers');

module.exports = {
  esterilizaciones: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObjectAllLike(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return (list = await Esterilizaciones.findAll(where));
    } catch (error) {
      throw error;
    }
  },

  saveSterilizations: async (args) => {
    try {
      return await Esterilizaciones.create(args.esteriliz).then((data) => {
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },
};
