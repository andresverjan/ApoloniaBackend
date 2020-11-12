const db = require("../../models");
const helpers = require("../../helpers");
const Application = db.application;
const Campo = db.campos;
const Op = db.Sequelize.Op;

module.exports = {
    login: async (args) => {
        console.log("INGRESO A getUserMenu");
        const { username, password } = args.filter;
        try {
            const result = await db.sequelize.query('CALL login(:USERNAME, :PASSWORD)',
                { replacements: { USERNAME: username, PASSWORD: password,  } });

            let newFields = result.map(field => {
                console.log(field);
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

  
};