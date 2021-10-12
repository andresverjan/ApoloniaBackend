const { Op } = require('sequelize');
const moment = require('moment');
const db = require('../../models');
const helpers = require('../../helpers');
const EgresosProgramados = db.egresosProgramados;

module.exports = {
  egresosProgramados: async (args) => {
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

    let egresos = await EgresosProgramados.findAll(where);
    const totalRegistros = egresos.length;

    if (args.pagination) {
      const { limite: limit, pagina } = args.pagination;
      const offset = limit * (pagina-1);
      where = { ...where, limit, offset };
    }
    try {
      egresosProgramados = await EgresosProgramados.findAll(
        where,
      );
      return { totalRegistros, egresosProgramados };
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
  updateEgresosProgramados: async (args) => {
    try {
      await EgresosProgramados.update(
        args.egresoProgramado,
        {
          where: {
            T17Factura: args.egresoProgramado.T17Factura,
          },
        },
      ).then((data) => {
        console.log(data);
      });
      return `Egreso Programado con T17Factura = ${args.egresoProgramado.T17Factura} --> ACTUALIZADO`;
    } catch (error) {
      throw error;
    }
  },
  deleteEgresosProgramados: async (args) => {
    const { T17Factura } = args.egresoProgramado;
    try {
      EgresosProgramados.destroy({
        where: { T17Factura },
      })
        .then((resCode) => {
          if (resCode == 1) {
            console.log(
              'Egreso Programado was deleted successfully!',
            );
          } else {
            console.log(
              `Cannot delete Egreso Programado with T17Factura=${T17Factura}. Maybe Egreso Programado was not found!`,
            );
          }
        })
        .catch((err) => {
          console.log(
            'Could not delete Egreso Programado with T17Factura=' +
              T17Factura,
          );
        });
      return 'Egreso Programado fue borrado';
    } catch (error) {
      throw error;
    }
  },
};
