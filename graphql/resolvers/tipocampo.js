const db = require("../../models");
const TipoCampos = db.tipocampos;
const Op = db.Sequelize.Op;

module.exports = {
    tipocampos: async (args) => {
        console.log("INGRESO A TipoCampos");
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFormObject(args.filter);
            }
            let sort = { name: "1" };
            if (args.order != null && args.order != undefined) {
                sort = helpers.getOrderFromObject(args.order);
            }
            return list = await TipoCampos.findAll();
        } catch (error) {
            throw error;
        }
    }
    
};

