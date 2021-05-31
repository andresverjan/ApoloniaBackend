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
  updateEgresos: async (args) => {
    try {
      await Egresos.update(args.egreso, {
        where: { T17Factura: args.egreso.T17Factura },
      }).then((data) => {
        console.log(data);
      });
      return `Egreso con T17Factura = ${args.egreso.T17Factura} --> ACTUALIZADO`;
    } catch (error) {
      throw error;
    }
  },
  deleteEgresos: async (args) => {
    const { T17Factura } = args.egreso;
    try {
      Egresos.destroy({
        where: { T17Factura },
      })
        .then((resCode) => {
          if (resCode == 1) {
            console.log('Egreso was deleted successfully!');
          } else {
            console.log(
              `Cannot delete Egreso with T17Factura=${T17Factura}. Maybe Egreso was not found!`,
            );
          }
        })
        .catch((err) => {
          console.log('Could not delete Egreso with T17Factura=' + T17Factura);
        });
      return 'Egreso fue borrado';
    } catch (error) {
      throw error;
    }
  },
};
