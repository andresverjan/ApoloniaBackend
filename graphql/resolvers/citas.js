const { Op } = require('sequelize');
const moment = require('moment');
const db = require('../../models');
const helpers = require('../../helpers');
const CitaTrazabilidad = db.citaTrazabilidad;
const Citas = db.citas;
const Status = db.status;
const Paciente = db.paciente;

module.exports = {
  createCita: async (args) => {
    console.log('INGRESO A CREATE CITAS');
    try {
      return await Citas.create(args.cita).then((data) => {
        CitaTrazabilidad.create(args.cita).then((data) => {
          console.log('Creating Trazabilidad.');
          console.log(data);
        });
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },
  deleteCita: async (args) => {
    console.log('INGRESO A deleteEtiquetas');
    const { id } = args.cita;
    try {
      Citas.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            console.log('Cita was deleted successfully!');
          } else {
            console.log(
              `Cannot delete Cita with id=${id}. Maybe Cita was not found!`
            );
          }
        })
        .catch((err) => {
          console.log('Could not delete Cita with id=' + id);
        });
      return 'Cita fue borrada';
    } catch (error) {
      throw error;
    }
  },
  updateCita: async (args) => {
    console.log('INGRESO A updateCitas');
    try {
      return await Citas.update(args.cita, {
        where: { id: args.cita.id },
      }).then((data) => {
        CitaTrazabilidad.create(args.cita).then((data) => {
          console.log('Creating Trazabilidad.');
          console.log(data);
        });
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },
  getCitasByOdontologoId: async (args) => {
    try {
      const id = args.odontologoId;
      const list = await Citas.findAll({
        where: { odontologoId: id },
      });

      if (!list) {
        throw new Error('not found');
      }
      return list;
    } catch (error) {
      throw error;
    }
  },
  getCita: async (args) => {
    const { id } = args.cita;
    const cita = await Citas.findOne({
      where: { id },
    });

    console.log(cita);
    return cita;
  },
  statusCitas: async () => {
    try {
      return (list = await Status.findAll());
    } catch (error) {
      throw error;
    }
  },

  citasByToday: async (args) => {
    try {
      let where = {};
      var date = new Date();
      date.setHours(18,59,0,0);

      var dati = new Date();
      dati.setHours(0,0,0,0);

      if (args.filter) {
        where = helpers.getFilterFromObject(args.filter);

        if (args.filter.fechend &&  args.filter.fechend != '' &&
            args.filter.fechini &&  args.filter.fechini != '' && 
            ( args.filter.fechend > args.filter.fechini )) {
          where.where.push({
            ['start']: { [Op.gte]: moment(args.filter.fechini).toDate() },
            ['end']: { [Op.lte]: moment(args.filter.fechend).toDate() }
          });
          where.where = where.where.filter(
            (e) =>
              !(
                e.hasOwnProperty('fechini') === true ||
                e.hasOwnProperty('fechend') === true
              ),
          );
        } else {
          where.where.push({
            ['start']: { [Op.gte]: dati }, //new Date()
            ['end']: { [Op.lte]: date}
          });
        }
  
        switch (args.filter.estado) {
          case 0:
              console.log("It is a Sunday.");
              break;
          case 1:
              console.log("It is a Monday.");
              where.where.push({
                ['status']: {
                  [Op.eq]: [args.filter.estado]
                },
              });
              break;
          case 3:
              console.log("It is a Wednesday.");
              where.where.push({
                ['status']: {
                  [Op.eq]: [args.filter.estado]
                },
              });
              break;
          case 6:
              console.log("It is a Saturday.");
              where.where.push({
                ['status']: {
                  [Op.eq]: [args.filter.estado]
                },
              });
              break;
          default:
              console.log("No such day exists!");
              where.where.push({
                ['status']: {
                  [Op.in]: [1, 2, 4, 5]
                },
              });
              break;
        }

        where.where = where.where.filter(
          (e) =>  !(e.hasOwnProperty('estado') === true)
        );
      } else {
        where = helpers.getFilterFromObject({status: 1});
        date.setHours(23,59,0,0);
        where.where.push({
          ['start']: { [Op.gte]: new Date() }, //dati
          ['end']: { [Op.lte]: date}
        });
      }

      return await Paciente.findAll({
        attributes: [ 'paciente.TipoDoc', 'paciente.Cedula', 'paciente.Apellidos', 
          'paciente.Nombres', 'paciente.Sexo', 'paciente.Mail', 'citas.start', 
          'citas.end', 'citas.odontologoId'
        ],
        distinct: 'id',
        include: {
            model: Citas,
            as: 'citas',
            where: where.where
        },
        raw: true
      })
    } catch (error) {
        throw error;
    }
  },
};
