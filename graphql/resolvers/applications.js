const db = require("../../models");
const helpers = require("../../helpers");
const Application = db.application;

module.exports = {
    applications: async (args) => {
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }            
            return list = await Application.findAll(where);
        } catch (error) {
            throw error;
        }
    }
};