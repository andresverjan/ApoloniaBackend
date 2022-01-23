const db = require('../../models');
const Pacientes = db.paciente;
const Recordatorio = db.recordatorios;

const helpers = require('../../helpers');

module.exports = {
  pacientes: async (args) => {
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

      return (list = await Pacientes.findAll(where));
    } catch (error) {
      throw error;
    }
  },
  pacienteById: async (args) => {
    const { id } = args;

    return Pacientes.findOne({ where: { id } });
  },
  recordatorios: async () => {
    try {
      return (list = await Recordatorio.findAll());
    } catch (error) {
      throw error;
    }
  },
};
