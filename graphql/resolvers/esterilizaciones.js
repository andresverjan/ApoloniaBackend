const db = require("../../models");
const Esterilizaciones = db.esterilizacion;
const helpers = require("../../helpers");

module.exports = {
  esterilizaciones: async (args) => {
    try {
      // let where = {};

      // if (args.filter != null && args.filter != undefined) {
      //   where = helpers.getFilterFromObjectAllLike(args.filter);
      // }
      // console.log(where);
      // where= {...where,}
      return (list = await Esterilizaciones.findAll());
    } catch (error) {
      throw error;
    }
  },
  
};