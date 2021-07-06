const db = require('../../models');
const EgresosProgramados = db.egresosProgramados;

module.exports = {
  egresosProgramados: async (args) => {
    try {
      return await EgresosProgramados.findAll();
    } catch (error) {
      throw error;
    }
  },
  createEgresosProgramados: async (args) => {
    try {
      await EgresosProgramados.create(
        args.egresoProgramado,
      ).then((data) => {
        console.log(data);
      });
      return `Egreso Programado con T17Factura = ${args.egresoProgramado.T17Factura} --> CREADO`;
    } catch (error) {
      throw error;
    }
  },
};
