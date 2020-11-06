const db = require("../../models");
const helpers = require("../../helpers");
const Application = db.application;
const Campo = db.campos;

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

            const _app = await Application.create(application).then((_app) => {
                
                let newFields = campos.map(field => {
                    return {
                        ...field,
                        applicationId: _app.id,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                });
        
              Campo.bulkCreate(newFields, { validate: true })
                .then(() => {
                  
                })
                .catch((err) => {
                    throw err;
                });
              });

            return true;
        } catch (error) {
            throw error;
        }
    }
};