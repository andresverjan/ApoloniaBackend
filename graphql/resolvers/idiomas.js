const db = require("../../models");
const Idiomas = db.idiomas;
const Op = db.Sequelize.Op;

module.exports = {
  idiomas: async (args) => {
    console.log("INGRESO A IDIOMAS");
    try {
      return (list = await Idiomas.findAll());
    } catch (error) {
      throw error;
    }
  },
};