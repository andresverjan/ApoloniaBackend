const db = require("../../models");
const CitasHC = db.citashc;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");
const CitaTrazabilidad = db.citaTrazabilidad;
const EventosAdversos = db.evolucionesEventos;
const Remision = db.evolucionesRemision;
const Recetario = db.evolucionesRecetario;

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
      let objTazabilidad = { odontologoId, Cedula, servicioId, title, eventosAdversos, remision, medicamentos } = args.citaHC;
      objTazabilidad.title = "Evoluciones Trazabilidad!";
      console.log(eventosAdversos);
      console.log(remision);
      console.log(medicamentos);
      return (l =await CitasHC.create(args.citaHC).then((data) => {
        console.log(data);
        eventosAdversos = eventosAdversos.map(field => {
          return {
            ...field,
            evolucionId: data.id,
            pacienteId: Cedula,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        });
        EventosAdversos.bulkCreate(eventosAdversos, { validate: true }).then((data2) => {
          console.log(data2);
        });

        remision = remision.map(field => {
          return {
            ...field,
            evolucionId: data.id,
            pacienteId: Cedula,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        });
        console.log("**************************");
        console.log(remision);
        Remision.bulkCreate(remision, { validate: true }).then((data2) => {
          console.log(data2);
        });


        medicamentos = medicamentos.map(field => {
          return {
            ...field,
            evolucionId: data.id,
            pacienteId: Cedula,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        });
        console.log("**************************");
        console.log(medicamentos);
        Recetario.bulkCreate(medicamentos, { validate: true }).then((data2) => {
          console.log(data2);
        });
        
      
        CitaTrazabilidad.create(objTazabilidad).then((data) => {
          console.log('Creating Trazabilidad.');
        });
        return data;
      }));      
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