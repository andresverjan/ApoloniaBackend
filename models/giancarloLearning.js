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
            type: Sequelize.INTEGER
        },
        eliminado : {
            type: Sequelize.INTEGER
        },
        sexo : {
            type: Sequelize.STRING
        },
        edad : {
            type: Sequelize.INTEGER
        },
        mascotaFavorita : {
            type: Sequelize.STRING
        }

    });
    return giancarloLearning;
};