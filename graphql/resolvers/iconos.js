const db = require("../../models");
const helpers = require("../../helpers");
const Iconos = db.iconos;
const Campo = db.campos;
const Op = db.Sequelize.Op;

module.exports = {
    iconos: async (args) => {
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
            return list = await Iconos.findAll(where);
        } catch (error) {
            throw error;
        }
    },
};