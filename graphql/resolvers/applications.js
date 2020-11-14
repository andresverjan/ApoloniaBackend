const db = require("../../models");
const helpers = require("../../helpers");
const Application = db.application;
const Campo = db.campos;
const Op = db.Sequelize.Op;

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
            const { application, campos } = args.application;
            let  applicationId = 0;
            await Application.create(application).then((_app) => {
                applicationId = _app.id;
                let newFields = campos.map(field => {
                    return {
                        ...field,
                        applicationId: _app.id,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                });        
                Campo.bulkCreate(newFields, { validate: true }).then(() => {
                })
                .catch((err) => {
                    throw err;
                });
              });
              return await Application.findOne( { where : { id:  applicationId}});
        } catch (error) {
            throw error;
        }
    },

    updateAppField: async (args) => {
        try {
            const { application, campos } = args.application;
            let  applicationId = 0;

            await Application.findOne({ where: { id : application.id }})
                .then(() => {
                    applicationId = application.id;
                    let newFields = campos.map(field => {
                        return {
                            ...field,
                            applicationId: application.id,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        }
                    });
                
                Application.update({ nombre: application.nombre, updatedAt: new Date().toISOString()}, {   
                    where: { id: application.id }})
                .then(() => {
                    
                    Campo.destroy({ where : { applicationId: application.id }}).then(() => {

                        Campo.bulkCreate(newFields, { validate: true }).then(() => {})
                        .catch((err) => {
                            throw err;
                        });
                    })
                    .catch((err) => {
                        throw err;
                    });
                }).catch(err => {
                    throw err;
                });
            }).catch(err => {
                throw err;
            });
              
            return await Application.findOne( { where : { id:  applicationId}});
        } catch (error) {
            throw error;
        }
    },

    getFieldsByAppId: async args => {
        try {
            const appId = args.applicationId;
            console.log("el  valor es: " + appId);
            const list = await Campo.findAll({ where: {applicationId: appId },
                order: [
                    ['order', 'ASC']
                ]
            });

            if (!list) {
                throw new Error('not found');
            }
            return list;
        }
        catch (error) {
            throw error
        }
    },

    deleteAppField: async args => {
        try {
            const appId = args.applicationId
            let x = false;
            console.log("applicationId += ", args.applicationId);
            
            await Application.destroy({ where: { id: appId } }).then(num => {
                if (num == 1) {
                    Campo.destroy({ where : { applicationId:  appId }}).then(() => {        
                        console.log("Campos were deleted successfully!");
                        
                    })
                    .catch((err) => {
                        console.log("Campos were deleted NAAa");
                        throw err;
                    });
                    x = true;
                    console.log("App's were deleted successfully!");
                } else {
                    console.log(`Cannot delete Fields with id=${appId}. Maybe Application was not found!`);
                }
            })
            .catch(err => {
                    console.log("Could not delete Application with id=" + appId);
            });
            
            return x;
        }
        catch (error) {
            console.log("error_applicationId =", args.applicationId);
            throw error
        }
    }
};