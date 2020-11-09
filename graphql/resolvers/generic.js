const db = require("../../models");
const TipoCampos = db.tipocampos;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");
const Application = db.application;

module.exports = {
    genericList: async (args) => {
        console.log("INGRESO A genericList");
        const { id } = args.filter;
        try {
            const application = await Application.findOne({ where: { id: id } });
            const result = await db.sequelize.query('CALL genericList (:APPLICATION_ID)',
                { replacements: { APPLICATION_ID: id } });

            let newFields = result.map(field => {
                return JSON.stringify(field);
            });
            const r = {
                application,
                campos: newFields
            };
            return [r];
        } catch (error) {
            throw error;
        }
    },
    genericSave: async (args) => {
        console.log("INGRESO A genericSave");
        const { application, campos } = args.application;

        try {
            let columnas = campos.map(field => {
                return "`" + field.nombre + "`";
            }).join();
            let values = campos.map(field => {
                return "'" + field.valor + "'";
            }).join();
            console.log(columnas);
            console.log(values);
            const result = await db.sequelize.query("CALL genericSave (:APPLICATION_ID, :COLUMNAS, :VALUES )",
                { replacements: { APPLICATION_ID: application.id, COLUMNAS: columnas, VALUES: values } })
                .then(
                    v => {
                        let genericResponse = {
                            success: true,
                            message: ""
                        }
                        return genericResponse;
                    }
                ).catch(function (err) {
                    console.log("ERROR EN LLAMADA PROCEDURE");
                    console.log(err);
                    let genericResponse = {
                        success: false,
                        message: "Problemas Guardando Intente Nuevamente.. "
                    }
                    console.log("WILL RETURN ");
                    console.log(genericResponse);
                    return genericResponse;
                });
            console.log (result);
            return result;
        } catch (error) {
            console.log("ENTRO A THROW ERROR!");
            throw error;
        }
    },




};

