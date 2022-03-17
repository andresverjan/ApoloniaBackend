const db = require("../../models");
const Said = db.saidLearning;
const Op = db.Sequelize.Op;

module.exports = {
    said: async (args) => {
      console.log("INGRESO A SAIDLEARNING");
      try {
        return (list = await Said.findAll());
      } catch (error) {
        throw error;
      }
    },
    deleteSaid: async (args) => {
      console.log("INGRESO A deleteSaid");
      const { id } = args.saidsito;
      try {
        Said.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              console.log("SaidLearning was deleted successfully!");
            } else {
              console.log(
                `Cannot delete SaidLearning with id=${id}. Maybe Tutorial was not found!`
              );
            }
          })
          .catch((err) => {
            console.log("Could not delete Tutorial with id=" + id);
          });
        return (list = await Said.findAll());
      } catch (error) {
        throw error;
      }
    },
    createSaid: async (args) => {
      try {
        return await Said.create(args.saidsito).then((data) => {
          console.log(data);
        });
      } catch (error) {
        throw error;
      }
    },
    updateSaid: async (args) => {
      console.log("INGRESO A updateSaid");
      try {
        return await Said.update(args.saidsito, {
          where: { id: args.saidsito.id },
        }).then((data) => {
          console.log(data);
        });
      } catch (error) {
        throw error;
      }
    },
  };