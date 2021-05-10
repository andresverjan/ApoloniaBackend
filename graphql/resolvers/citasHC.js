const db = require("../../models");
const CitasHC = db.citashc;
const Op = db.Sequelize.Op;

module.exports = {
  idiomas: async (args) => {
    try {
      return (list = await CitasHC.findAll());
    } catch (error) {
      throw error;
    }
  },
};