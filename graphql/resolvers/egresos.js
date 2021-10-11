const db = require('../../models');
const Egresos = db.egresos;

module.exports = {
  egresos: async (args) => {
    try {
      return await Egresos.findAll();
    } catch (error) {
      throw error;
    }
  },
  createEgresos: async (args) => {
    try {
      await Egresos.create(args.egreso).then((data) => {
        console.log(data);
      });
      return `Egreso con T17Factura = ${args.egreso.T17Factura} --> CREADO`;
    } catch (error) {
      throw error;
    }
  },
};
