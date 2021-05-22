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
      return `Egreso con T17Nivel1 = ${args.egreso.T17Nivel1} --> CREADO`;
    } catch (error) {
      throw error;
    }
  },
  updateEgresos: async (args) => {
    try {
      await Egresos.update(args.egreso, {
        where: { T17Nivel1: args.egreso.T17Nivel1 },
      }).then((data) => {
        console.log(data);
      });
      return `Egreso con T17Nivel1 = ${args.egreso.T17Nivel1} --> ACTUALIZADO`;
    } catch (error) {
      throw error;
    }
  },
  deleteEgresos: async (args) => {
    const { T17Nivel1 } = args.egreso;
    try {
      Egresos.destroy({
        where: { T17Nivel1 },
      })
        .then((resCode) => {
          if (resCode == 1) {
            console.log('Egreso was deleted successfully!');
          } else {
            console.log(
              `Cannot delete Egreso with T17Nivel1=${T17Nivel1}. Maybe Egreso was not found!`,
            );
          }
        })
        .catch((err) => {
          console.log('Could not delete Egreso with T17Nivel1=' + T17Nivel1);
        });
      return 'Egreso fue borrado';
    } catch (error) {
      throw error;
    }
  },
};
