const { Op } = require('sequelize');
const moment = require('moment');
const db = require('../../models');
const Esterilizaciones = db.esterilizaciones;
const helpers = require('../../helpers');

module.exports = {
  esterilizaciones: async (args) => {
    try {
      let where = {};
      if (args.filter) {
        where = helpers.getFilterFromObject(args.filter);
        if (
          args.filter.fechend &&  args.filter.fechend != '' &&
          args.filter.fechini &&  args.filter.fechini != ''
        ) {
          where.where.push({
            ['T27Fecha']: {
              [Op.between]: [
                moment(args.filter.fechini).toDate(),
                moment(args.filter.fechend).toDate(),
              ],
            },
          });
        }
        where.where = where.where.filter(
          (e) =>
            !(
              e.hasOwnProperty('fechini') === true ||
              e.hasOwnProperty('fechend') === true
            ),
        );
      }
      
      let list = await Esterilizaciones.findAll(where);
      const totalRegistros = list.length;

      if (args.pagination) {
        let { limite: limit, pagina } = args.pagination;
        pagina =  pagina-1;
        const offset = limit * pagina;
        where = { ...where, limit, offset };
      }      

      list = await Esterilizaciones.findAll(where);
      return { totalRegistros,  list };

    } catch (error) {
      throw error;
    }
  },

  saveSterilizations: async (args) => {
    try {
      const _resp = await Esterilizaciones.create(args.esteriliz).then((data) => {
        console.log(data);
        return data;
      });
      return _resp;
    } catch (error) {
      throw error;
    }
  },

  updateEsterilizacion: async (args) => {
    try {
      return await Esterilizaciones.update(args.esterilizacion, {
        where: { id: args.esterilizacion.id },
      }).then((data) => {
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },
};
