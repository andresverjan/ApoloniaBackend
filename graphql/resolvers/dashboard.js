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
    let startOfDay = moment().startOf('day').format('DD');
    try {
      let objectFilter = {};
      objectFilter.where = [];
      objectFilter.where =
      {
        [Op.and]: [
          db.sequelize.where(db.sequelize.fn('MONTH', db.sequelize.col('FechaNacimiento')), startOfMonth),
          db.sequelize.where(db.sequelize.fn('DAY', db.sequelize.col('FechaNacimiento')), { [Op.gte]: startOfDay})
        ]
      }
      objectFilter.order = [
        [db.sequelize.fn('DAY', db.sequelize.col('FechaNacimiento')), 'ASC'],
      ];
      return list = await Pacientes.findAll(objectFilter);
    } catch (error) {
      throw error;
    }
  },

};
