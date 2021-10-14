const db = require("../../models");
const CitasHC = db.citashc;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");
const CitaTrazabilidad = db.citaTrazabilidad;

module.exports = {
  getCitasHC: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFromObjectAllLike(args.filter);
      }
      if (args.order != null && args.order != undefined) {
        where.order = helpers.getOrderFromObject(args.order);
      }
      return (list = await CitasHC.findAll(where));
    } catch (error) {
      throw error;
    }
  },

  saveEvolucion: async (args) => {
    console.log('INGRESO A CREATE HISTORIA CLINICA');
    try {
      let objTazabilidad = { odontologoId, pacienteId, servicioId, title } = args.citaHC;
      objTazabilidad.title = "Evoluciones Trazabilidad!";
      return (list = await CitasHC.create(args.citaHC).then((data) => {
        CitaTrazabilidad.create(objTazabilidad).then((data) => {
          console.log('Creating Trazabilidad.');
        });
        return data;
      }))
    } catch (error) {
      throw error;
    }
  },

  updateEvolucion: async (args) => {
    console.log('INGRESO A updateEvolucion');
    try {
      return await CitasHC.update(args.citaHC, {
        where: { id: args.citaHC.id },
      }).then((data) => {
        let objTazabilidad = { odontologoId, pacienteId, servicioId, title } = args.citaHC;
        objTazabilidad.title = "Evoluciones Trazabilidad Actualizada!";
        CitaTrazabilidad.create(objTazabilidad).then((data) => {
          console.log('Creating Trazabilidad.');
        });
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },


};