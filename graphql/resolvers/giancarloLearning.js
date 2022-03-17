const db = require("../../models");
const Gl = db.giancarloLearning; //GL es la tabla o modelo

module.exports = {
    giancarloLearning: async (args) => {
        console.log("INGRESO TABLA");
        try{
            return(list = await Gl.findAll()); 
        }catch(error){
            throw error;
        }
    },
    createGiancarloLearning: async (args) => {
        try {
            return await Gl.create(args.tablaObject).then((data) =>{
                console.log(data);
                return data;
            })
        } catch (error) {
            throw error;
        }
    },
    deleteGiancarloLearning: async (args) => {
        console.log("INGRESO A DELETE GIANCARLO LEARNING");
        const { id } = args.tablaObject;
        try {
            Gl.destroy({
                where: {id: id},
            })
                .then((num) =>
                {
                    if(num == 1){
                        console.log("giancarloLearning was deleted successfully");
                    }else{
                        console.log(
                            `Cannot delete Etiquetas with id=${id}. Maybe Tutorial was not found!`
                        );
                    }
                })
                .catch((err) => {
                    console.log("Could not delete Tutorial with id=" + id);
                });
                return (list = await Gl.findAll());
        } catch (error) {
            throw error;
        }
    },
    updateGiancarloLearning: async (args) => {
        console.log("INGRESO giancarloLearningUpdate");
        try {
            return await Gl.update(args.tablaObject, { //Nueva data
                where: {id: args.tablaObject.id}, //Donde el id es actualizado por el nuevo
            }).then((data) => {
                console.log(data);
            })
        } catch (error) {
            throw error;
        }
    }
};