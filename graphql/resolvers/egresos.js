const { Op } = require('sequelize');
const moment = require('moment');
const db = require('../../models');
const helpers = require('../../helpers');
const Egresos = db.egresos;

module.exports = {
  egresos: async (args) => {
    let where = {};
    if (args.filter) {
      where = helpers.getFilterFromObject(args.filter);
      if (
        args.filter.T17FechaFin &&
        args.filter.T17FechaFin != '' &&
        args.filter.T17FechaIni &&
        args.filter.T17FechaIni != ''
      ) {
        where.where.push({
          ['T17Fecha']: {
            [Op.between]: [
              moment(args.filter.T17FechaIni).toDate(),
              moment(args.filter.T17FechaFin).toDate(),
            ],
          },
        });
      }
      where.where = where.where.filter(
        (e) =>
          !(
            e.hasOwnProperty('T17FechaIni') === true ||
            e.hasOwnProperty('T17FechaFin') === true
          ),
      );
    }

    let egresos = await Egresos.findAll(where);
    const totalRegistros = egresos.length;

    if (args.pagination) {
      const { limite: limit, pagina } = args.pagination;
      const offset = limit * pagina;
      where = { ...where, limit, offset };
    }
    try {
      egresos = await Egresos.findAll(where);
      return { totalRegistros, egresos };
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
          console.log(
            'Could not delete Egreso with T17Factura=' +
              T17Factura,
          );
        });
      return 'Egreso fue borrado';
    } catch (error) {
      throw error;
    }
  },
};
