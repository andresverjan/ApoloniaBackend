const db = require("../../models");
const helpers = require("../../helpers");
const Application = db.application;
const Campos = db.campo;

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
    },

    saveAppFields: async (args) => {
        try {
            const { application, campos } = args.application
            let newFields = campos.map(field => {
                return {
                    ...field,
                    applicationId: application.id,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            });
            return campos = await Campos.insertMany(newFields);
//            return { ...newObj._doc, _id: newObj.id }
        } catch (error) {
            throw error;
        }
    },
};