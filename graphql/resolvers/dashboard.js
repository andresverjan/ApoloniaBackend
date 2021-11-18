const db = require("../../models");
const Pacientes = db.paciente;
const moment = require('moment');
const { Op } = require('sequelize');
const paciente = require("../../models/paciente");
const Citas = db.citas;
const Status = db.status;

module.exports = {
  getNumPacientes: async (args) => {
    console.log("argumentos ");
    console.log(args);
    try {
      const count = await Pacientes.count();
      return { count };
    } catch (error) {
      throw error;
    }
  },
  getHappyBirthdayList: async (args) => {
    let startOfMonth = moment().startOf('month').format('MM');
    try {
      let objectFilter = {};
      objectFilter.where = [];
      objectFilter.where = db.sequelize.where(db.sequelize.fn('MONTH', db.sequelize.col('FechaNacimiento')), startOfMonth);
      return list = await Pacientes.findAll(objectFilter);
    } catch (error) {
      throw error;
    }
  },

  getPacienteSexo: async () => {
    try {
      return await Pacientes.findAll({
        attributes: ['Sexo', [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'consult']],
        group: ['paciente.Sexo'],
      }).then((data) => {
        return data.map(pacientes => {
          return pacientes.dataValues;
        });
      })
    } catch (error) {
      throw error;
    }
  },

  getNumCitasAtendidasToday: async () => {
    let time = moment().startOf('day').format('dd');
    try {
      let objectFilter = {};
      objectFilter.where = [];
      objectFilter.where = {
        'status': '2',
        [Op.and]: db.sequelize.where(db.sequelize.fn('DAY', db.sequelize.col('start')), time)
      };


      return citaAte = await Citas.findAll({
        where: objectFilter.where,
        attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count']],
      }).then((data) => {
        let response = {
          ...data.dataValues
        };
        return response;
      });
    } catch (error) {
      throw error;
    }
  },


  /*
   * Permite obtener la cantidad de citas que se atendieron en el mes actual.
  */
  getNumCitasAtendidasThisMonth: async () => {
    let citasMonth = moment().startOf('month').format('MM');
    console.log(citasMonth);
    try {
      let objectFilter = {};
      objectFilter.where = [];
      objectFilter.where = {
        'status': '2',
        [Op.and]: db.sequelize.where(db.sequelize.fn('MONTH', db.sequelize.col('start')), citasMonth)
      };
      return await Citas.findOne({
        where: objectFilter.where,
        attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count']],
      }).then((data) => {
        let response = {
          ...data.dataValues
        };
        return response;
      });
    } catch (error) {
      throw error;
    }
  },


  /*
  * Permite obtener la cantidad de citas que se atendieron cada mes en el año actual
  */
  getNumCitasAtendidasbyMonthThisYear: async () => {
    let year = moment().startOf('year').format('YYYY');
    try {
      let objectFilter = {};
      objectFilter.where = [];
      objectFilter.where = {
        'status': '2',
        [Op.and]: db.sequelize.where(db.sequelize.fn('YEAR', db.sequelize.col('start')), year)
      };
      return await Citas.findAll({
        where: objectFilter.where,
        attributes: [[db.sequelize.fn('MONTH', db.sequelize.col('start')), 'MONTH'], [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count']],
        group: ['MONTH']
      }).then((data) => {
        return data.map(obj => {
          return obj.dataValues;
        });
      });
    } catch (error) {
      throw error;
    }
  },

};
