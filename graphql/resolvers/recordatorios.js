const db = require('../../models');
const Recordatorio = db.recordatorios;

const helpers = require('../../helpers');

module.exports = {
  recordatorios: async () => {
    try {
      return (list = await Recordatorio.findAll());
    } catch (error) {
      throw error;
    }
  },
};