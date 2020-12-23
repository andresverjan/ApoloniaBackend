module.exports = (sequelize, Sequelize) => {
    const citaTrazabilidadSchema = sequelize.define("citaTrazabilidad", {
        title: {
            type: Sequelize.STRING,
        },
        start: {
            type: Sequelize.STRING,
        },
        end: {
            type: Sequelize.STRING,
        },        
        horaIngreso:{
            type: Sequelize.STRING,
        },
        horaSalida:{
            type: Sequelize.STRING,
        },
        status:{
            type: Sequelize.INTEGER,
        },        
        observaciones:{
            type: Sequelize.STRING,
        },
        EmpresaId:{
            type: Sequelize.INTEGER,
        },
        odontologoId:{
            type: Sequelize.INTEGER,
        },
        pacienteId:{
            type: Sequelize.INTEGER,
        },
        servicioId:{
            type: Sequelize.INTEGER,
        },
    },
    {
        freezeTableName: true
    });
    return citaTrazabilidadSchema;
};
