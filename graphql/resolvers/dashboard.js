const db = require("../../models");
const Pacientes = db.paciente;
const moment = require('moment');
const { Op } = require('sequelize');

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
      objectFilter.where= [];
      objectFilter.where= db.sequelize.where (db.sequelize.fn('MONTH', db.sequelize.col('FechaNacimiento')) , startOfMonth);
      return list = await Pacientes.findAll(objectFilter);
    } catch (error) {
      throw error;
    }
  },

};
