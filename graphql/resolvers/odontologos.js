const db = require("../../models");
const Odontologo = db.odontologos;

module.exports = {

    odontologos: async () => {
        console.log("INGRESO A mascaras");
        try {
            return list = await Odontologo.findAll();
        } catch (error) {
            throw error;
        }
    }



};