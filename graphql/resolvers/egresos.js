const db = require('../../models');
const helpers = require('../../helpers');
const moment = require('moment');
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
      const offset = limit * (pagina - 1);
      where = { ...where, limit, offset };
    }
    try {
      const egresos = await Egresos.findAll(where);
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
};
