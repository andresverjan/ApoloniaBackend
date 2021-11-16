const { Op } = require('sequelize');
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
      date.setHours(23,59,0,0);

      if (args.filter) {
        where = helpers.getFilterFromObject(args.filter);
        if (args.filter.estado &&  args.filter.estado != 6) {
          where.where.push({
            ['status']: {
              [Op.in]: [1, 2, 3, 4, 5]
            },
          });
        }
        else {
          where.where.push({
            ['status']: {
              [Op.eq]: [args.filter.estado]
            },
          });
        }

        where.where = where.where.filter(
          (e) =>  !(e.hasOwnProperty('estado') === true)
        );
      } else {
        where = helpers.getFilterFromObject({status: 1});
      }

      where.where.push({
        ['start']: { [Op.gte]: new Date() },
        ['end']: { [Op.lte]: date}
      });

      return await Paciente.findAll({
        attributes: ['id', 'Cedula', 'Apellidos', 'Nombres', 'Sexo', 'Mail'],
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
