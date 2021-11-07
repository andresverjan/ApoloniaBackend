const { Op } = require('sequelize');
const moment = require('moment');
const db = require('../../models');
const Esterilizaciones = db.esterilizaciones;
const Dispositivo = db.dispositivos;
const EsterilizacionDispositivo = db.esterilizacionesDispositivos;
//const Op = db.Sequelize.Op;
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
    
      try {
        list = await Esterilizaciones.findAll(where);
        return { totalRegistros,  list };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },

  devicesByEsterilizationId: async (args) => {
    try {
        return devices = await EsterilizacionDispositivo.findAll({
            attributes: ['dispositivoId', 'dispositivos.nombre', 'cantidad', 'tiposEmpaqueEsterilizacionId'],
            distinct: 'dispositivoId',
            include: {
                model: Dispositivo,
                as: 'dispositivos'
            },
            where: {
              esterilizacionId: { [Op.eq]: args.id }
            },
            raw: true
        })
    } catch (error) {
        throw error;
    }
  },

  saveSterilizations: async (args) => {
    try {
      const { sterilization, devices } = args.esterilizacion;
      let esterilId = 0;
      
      await Esterilizaciones.create(sterilization).then((_app) => {
        esterilId = _app.id;
        let newFields = devices.map(field => {
            return {
                esterilizacionId: _app.id,
                dispositivoId:  field.id,
                cantidad:       field.cantidad,
                tiposEmpaqueEsterilizacionId:  field.tipoEmpaque,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        });        
        EsterilizacionDispositivo.bulkCreate(newFields, { validate: true }).then(() => {
        })
        .catch((err) => {
            throw err;
        });
      });

      return await Esterilizaciones.findOne( { where : { id:  esterilId}});
    } catch (error) {
      throw error;
    }
  },

  updateSterilizations: async (args) => {
    try {
      const { sterilization, devices } = args.esterilizacion;
      let newFields = devices.map(field => {
          return {
              esterilizacionId: sterilization.id,
              dispositivoId:    field.id,
              tiposEmpaqueEsterilizacionId:    field.tipoEmpaque,
              cantidad:         field.cantidad,
              createdAt:        new Date().toISOString(),
              updatedAt:        new Date().toISOString()
          }
      });    

      await Esterilizaciones.update({ T27Fecha: sterilization.T27Fecha,
                                      sede: sterilization.sede,
                                      motivo: sterilization.motivo,
                                      tipo: sterilization.tipo,
                                      esporas: sterilization.esporas,
                                      timeMin: sterilization.timeMin,
                                      temper: sterilization.temper,
                                      presion: sterilization.presion,
                                      observ: sterilization.observ,
                                      updatedAt: new Date().toISOString()}, 
                                    { where: { id: sterilization.id }})
                                    .then(() => {              
          EsterilizacionDispositivo.destroy({ where : { esterilizacionId: sterilization.id }})
                                          .then(() => {
            EsterilizacionDispositivo.bulkCreate(newFields, { validate: true }).then(() => {})
              .catch((err) => {
                  throw err;
            });
          })
          .catch((err) => {
              throw err;
          });
      }).catch(err => {
          throw err;
      });
        
      return await Esterilizaciones.findOne({ where: { id: sterilization.id }});
    } catch (error) {
        throw error;
    }
  },

  dispositivos: async (args) => {
    try {
      return newFields = await Dispositivo.findAll({
          attributes: ['id'],
          distinct: 'id',
          include: {
              model: Esterilizaciones,
              through: 'esterilizacionesDispositivos', 
              distinct: 'id',
              as: 'esterilizaciones',
              where: {
                  id: { [Op.eq]: args.esterilizacionId }
              }
          },
          raw: true
      })
      .then((goes) => goes.map((i) => i.id))
      .then((ids) => Dispositivo.findAll({
          attributes: ['id', 'nombre'],     
          where: {
              id: { [Op.notIn]: ids }
          }
      })).catch(err => {
          throw err;
      });             
    } catch (error) {
        throw error;
    }
  },
};
