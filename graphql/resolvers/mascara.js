const db = require("../../models");
const Mascara = db.mascara;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");

module.exports = {
    mascaras: async (args) => {
        console.log("INGRESO A mascaras");
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
            return list = await Mascara.findAll( where );
        } catch (error) {
            throw error;
        }
    }
};

