const { Op } = require('sequelize');
const db = require('../../models');
const helpers = require('../../helpers');
const Empresa = db.empresa;

module.exports = {
  getEmpresaById: async args => {
    try {
      console.log(args);
      const id = args.id;
      console.log("el  valor es: " + id);
      return await Empresa.findOne({ where: { id } });
    }
    catch (error) {
      throw error
    }
  },



};
