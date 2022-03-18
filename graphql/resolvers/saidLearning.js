const { response } = require("express");
const db = require("../../models");
const Said = db.saidLearning;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");


module.exports = {
  saidLearning: async (args) => {
      console.log("INGRESO A SAIDLEARNING");
      try {
        let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
        return (list = await Said.findAll(where));
      } catch (error) {
        throw error;
      }
    },
    deleteSaid: async (args) => {
      console.log("INGRESO A deleteSaid");
      const { id } = args.saidLearning;
      try {
        var result= await Said.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              console.log("SaidLearning was deleted successfully!");
              return true;
            } else {
              console.log(
                `Cannot delete SaidLearning with id=${id}. Maybe Tutorial was not found!`
              );
              return false;
            }
          })
          .catch((err) => {
            console.log("Could not delete Tutorial with id=" + id);
          });
        return result;
      } catch (error) {
        throw error;
      }
    },
    createSaid: async (args) => {
      try {
        return await Said.create(args.saidLearning).then((data) => {
          console.log(data);
        });
      } catch (error) {
        throw error;
      }
    },
    updateSaid: async (args) => {
      console.log("INGRESO A updateSaid");
      try {
        return await Said.update(args.saidLearning, {
          where: { id: args.saidLearning.id },
        }).then((data) => {
          console.log(data);
        });
      } catch (error) {
        throw error;
      }
    },
  };