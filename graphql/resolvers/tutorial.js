const db = require("../../models");
const Tutorial = db.tutorials;
const Comment = db.comment;
const Op = db.Sequelize.Op;

module.exports = {
  tutoriales: async (args) => {
    console.log("INGRESO A TUT¿ORIALES");
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFormObject(args.filter);
      }

      let sort = { name: "1" };
      if (args.order != null && args.order != undefined) {
        sort = helpers.getOrderFromObject(args.order);
      }
      return (list = await Tutorial.findAll());
    } catch (error) {
      throw error;
    }
  },
  deleteTutorial: async (args) => {
    console.log("INGRESO A deleteTutorial");
    const { id, img, value, active, description } = args.tutorial;
    try {
      Tutorial.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            console.log("Tutorial was deleted successfully!");
          } else {
            console.log(
              `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            );
          }
        })
        .catch((err) => {
          console.log("Could not delete Tutorial with id=" + id);
        });
      return (list = await Tutorial.findAll());
    } catch (error) {
      throw error;
    }
  },
  createTutorial: async (args) => {
    console.log("INGRESO A createTutorial");
    //const { id, img, value, active, description } = args.tutorial;
    try {
      const _tutorial = await Tutorial.create(args.tutorial).then(
        (_tutorial) => {
          //console.log(data);
          console.log(_tutorial);
          const idTutorial = _tutorial.id;

          let comentarios = [
            {
              title: "one to many",
              description: "si sirve",
              tutorialId: _tutorial.id,
            },
            {
              title: "one to many to",
              description: "si sirve coi",
              tutorialId: _tutorial.id,
            },
          ];

          Comment.bulkCreate(comentarios, { validate: true })
            .then(() => {})
            .catch((err) => {});
        }
      );

      return _tutorial;
    } catch (error) {
      throw error;
    }
  },
  updateTutorial: async (args) => {
    console.log("INGRESO A updateTutorial");
    try {
      return await Tutorial.update(args.tutorial, {
        where: { id: args.tutorial.id },
      }).then((data) => {
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },
};
