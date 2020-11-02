const db = require("../../models");
const TipoCampos = db.tipocampos;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");

module.exports = {
    tipocampos: async (args) => {
        console.log("INGRESO A TipoCampos");
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
            return list = await TipoCampos.findAll(where);
        } catch (error) {
            throw error;
        }
    }
    
};

