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
  getCitasAtendidas: async () => {
    let citasMonth = moment().startOf('month').format('MM');
    try {
      return citaAte = await Citas.findAll({
        where:{status:'2'},
        attributes: ['status','start', [db.sequelize.fn('MONTH', db.sequelize.col('start')),citasMonth]],
      }).then((data) => {
        return data.map(result => {
          return result.dataValues;
        });
      });
    } catch (error) {
      throw error;
    }
  },


  /*
   * Permite obtener la cantidad de citas que se atendieron en el mes actual.
  */
  getNumCitasAtendidasByMonth: async () => {
    let citasMonth = moment().startOf('month').format('MM');
    console.log(citasMonth);
    try {
      let objectFilter = {};
      objectFilter.where = [];
      objectFilter.where = {
        'status' : '2',
        [Op.and]: db.sequelize.where(db.sequelize.fn('MONTH', db.sequelize.col('start')), citasMonth)
      };
      return await Citas.findOne({
        where:  objectFilter.where,
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


};
