const db = require("../../models");
const citas = require("../../models/citas");
const Citas = db.citas;
const Op = db.Sequelize.Op;

module.exports = {
  createCita: async (args) => {
    console.log("INGRESO A CREATE CITAS");

    try {
      return await Citas.create(args.cita).then((data) => {
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },

  deleteCita: async (args) => {
    console.log("INGRESO A deleteEtiquetas");
    const { id } = args.cita;
    try {
      Citas.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            console.log("Cita was deleted successfully!");
          } else {
            console.log(
              `Cannot delete Cita with id=${id}. Maybe Cita was not found!`
            );
          }
        })
        .catch((err) => {
          console.log("Could not delete Cita with id=" + id);
        });
      return "Cita fue borrada";
    } catch (error) {
      throw error;
    }
  },
  updateCita: async (args) => {
    console.log("INGRESO A updateCitas");
    try {
      return await Citas.update(args.cita, {
        where: { id: args.cita.id },
      }).then((data) => {
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
        where: { odontologoId: id }
      });

      if (!list) {
        throw new Error("not found");
      }
      return list;
    } catch (error) {
      throw error;
    }
  },
};