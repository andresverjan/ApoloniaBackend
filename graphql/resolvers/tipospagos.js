const db = require("../../models");
const TiposPagos = db.tipospagos;

const Op = db.Sequelize.Op;
const helpers = require("../../helpers");

module.exports = {
    tipospagos: async (args) => {
        console.log("INGRESO A TiposPagos");
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
            return list = await TiposPagos.findAll(where);
        } catch (error) {
            throw error;
        }
    },
};

