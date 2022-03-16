const db = require("../../models");
const Gl = db.giancarloLearning;

module.exports = {
    giancarloLearning: async (args) => {
        console.log("INGRESO TABLA");
        try{
            return(list = await Gl.findAll());
        }catch(error){
            throw error;
        }
    },
};