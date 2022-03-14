const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const giancarloLearning = sequelize.define("giancarloLearning",{
        nombre : {
            type: Sequelize.STRING
        },
        apellido : {
            type: Sequelize.STRING
        },
        cedula : {
            type: Sequelize.STRING
        },
        email : {
            type: Sequelize.STRING
        },
        fechaNacimiento : {
            type: Sequelize.STRING
        },
        activo : {
            type: Sequelize.INT
        },
        eliminado : {
            type: Sequelize.INT
        },
        sexo : {
            type: Sequelize.STRING
        },
        edad : {
            type: Sequelize.INT
        },
        mascotaFavorita : {
            type: Sequelize.STRING
        },
        createdAt : {
            type: Sequelize.DATE
        },
        updatedAt : {
            type: Sequelize.DATE
        }


    });
    return giancarloLearning;
}