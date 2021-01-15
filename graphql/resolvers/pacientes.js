const db = require("../../models");
const Pacientes = db.paciente;

const helpers = require("../../helpers");

module.exports = {
  pacientes: async (args) => {
    try {
      let where = {};
      console.log("!!!!!!!!", args);
      console.log("INGRESO A BUSCAR PACIENTES ");
      console.log(args.filter);
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObjectAllLike(args.filter);
      }
      console.log(where);
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }      

      return (list = await Pacientes.findAll(where));
    } catch (error) {
      throw error;
    }
  },
  pacienteById: async (args) => {
    const { id } = args;

    return Pacientes.findOne({ where: { id } });
  },
};
