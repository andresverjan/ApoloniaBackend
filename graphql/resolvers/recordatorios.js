const { Op } = require('sequelize');
const moment = require('moment');
const db = require('../../models');
const Recordatorio = db.recordatorios;

const helpers = require('../../helpers');

module.exports = {
  recordatorios: async (args) => {
    try {
      let where = {};
      if (args.filter) {
        where = helpers.getFilterFromObject(args.filter);
        if (
          args.filter.fechend &&  args.filter.fechend != '' &&
          args.filter.fechini &&  args.filter.fechini != ''
        ) {
          where.where.push({
            ['fechaRecordatorio']: {
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

      let lista = await Recordatorio.findAll(where);
      const totalRegistros = lista.length;

      if (args.pagination) {
        let { limite: limit, pagina } = args.pagination;
        pagina =  pagina-1;
        const offset = limit * pagina;
        where = { ...where, limit, offset };
      }      
    
      try {
        lista = await Recordatorio.findAll(where);
        return { totalRegistros,  lista };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },
  saveRecordatorios: async (args) => {
    try {
      const _resp = await Recordatorio.create(args.recordatorio).then((data) => {
        return data;
      });
      return _resp;
    } catch (error) {
      throw error;
    }
  },
  updateRecordatorios: async (args) => {
      try {
        return await Recordatorio.update(args.recordatorio, {
          where: { id: args.recordatorio.id },
        }).then((data) => {
          console.log(data);
        });
      } catch (error) {
        throw error;
      }
  },
  deleteRecordatorios: async (args) => {
    const { id } = args.recordatorio;
    try {
      Recordatorio.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            console.log('Deleted successfully!');
          } else {
            console.log('Problemas borrando cita');
          }
        })
        .catch((err) => {
          console.log('Could not delete Cita with id=' + id);
        });
      return 'success';
    } catch (error) {
      throw error;
    }
  },

};