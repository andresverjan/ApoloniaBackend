

module.exports = (sequelize, Sequelize) => {
    const CitasSchema = sequelize.define("cita", {
        TITLE: {
            type: Sequelize.STRING,
        },
        START: {
            type: Sequelize.STRING,
        },
        END: {
            type: Sequelize.STRING,
        },
        odontologoId:{
            type: Sequelize.INTEGER,
        },
        horaIngreso:{
            type: Sequelize.STRING,
        },
        horaSalida:{
            type: Sequelize.STRING,
        },
        asistencia:{
            type: Sequelize.BOOLEAN,
        },
        cancelado:{
            type: Sequelize.BOOLEAN,
        },
        observaciones:{
            type: Sequelize.STRING,
        }

    
        
    });
    return CitasSchema;
};