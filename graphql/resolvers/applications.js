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

            await Application.create(application).then((_app) => {
                
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
                    return { ..._app.doc };
                })
                .catch((err) => {
                    throw err;
                });
              });
        } catch (error) {
            throw error;
        }
    },

    getFieldsByAppId: async args => {
        try {
            console.log("argumentos ");
            console.log(args);
            const appId = args.applicationId;
            console.log("el  valor es: " + appId);
            const list = await Campo.findAll({ applicationId: { $eq: appId } });
            
            if (!list) {
                throw new Error('not found');
            }
            return list;/*.map(item => {
                return {
                    ...item._doc,
                    _id: item.id,
                    details: details,
                    createdAt: item._doc.createdAt ? new Date(item._doc.createdAt).toISOString() : new Date().toISOString(),
                    updatedAt: item._doc.updatedAt ? new Date(item._doc.updatedAt).toISOString() : new Date().toISOString()
                }
            })*/
        }
        catch (error) {
            throw error
        }
    },
};