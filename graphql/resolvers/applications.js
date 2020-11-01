const db = require("../../models");
const helpers = require("../../helpers");
const Application = db.application;

module.exports = {
    applications: async (args) => {
        try {
            let where = {};

            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFormObject(args.filter);
            }

            let sort = ['nombre', 'ASC'];
            if (args.order != null && args.order != undefined) {
                sort = helpers.getOrderFromObject(args.order);
            }
            
            const list = await Application.findAll({where: where, order: [sort]});
            return list;
            
        } catch (error) {
            throw error;
        }
    }
};