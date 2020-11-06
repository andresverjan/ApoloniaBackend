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
    },

    listaTables: async (args) => {
        console.log("INGRESO A listaTables");
        try {
            return list = await db.sequelize.query('CALL listTables ()');
        } catch (error) {
            throw error;
        }
    },

    listaCamposTable: async (args) => {
        console.log("INGRESO A listaCamposTable");
        const {TABLE_NAME} = args.filter;
        try {
            return list = await db.sequelize.query('CALL listColumnas (:TABLE_INPUT)', 
                         {replacements: { TABLE_INPUT: TABLE_NAME }});
        } catch (error) {
            throw error;
        }
    },


};

