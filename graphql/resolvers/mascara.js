const db = require("../../models");
const Mascara = db.mascara;
const Op = db.Sequelize.Op;

module.exports = {
    mascaras: async (args) => {
        console.log("INGRESO A mascaras");
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFormObject(args.filter);
            }
            let sort = { name: "1" };
            if (args.order != null && args.order != undefined) {
                sort = helpers.getOrderFromObject(args.order);
            }
            return list = await Mascara.findAll();
        } catch (error) {
            throw error;
        }
    }
};

