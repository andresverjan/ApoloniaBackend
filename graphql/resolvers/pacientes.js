const db = require("../../models");
const Pacientes = db.paciente;

const helpers = require("../../helpers");

module.exports = {
    pacientes: async (args) => {
        try {
            let where = {};
            console.log("!!!!!!!!", args)
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
            
            return (list = await Pacientes.findAll(where));
        } catch (error) {
            throw error;
        }
    }
};