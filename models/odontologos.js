module.exports = (sequelize, Sequelize) => {
    const OdontologosSchema = sequelize.define("odontologos", {
        IdOdontologo: {
            type: Sequelize.STRING,
        },
        Nombres: {
            type: Sequelize.STRING,
        },
        Apellidos: {
            type: Sequelize.STRING,
        },
        Especialidad: {
            type: Sequelize.STRING,
        },
        Titulo: {
            type: Sequelize.STRING,
        },
        Registro: {
            type: Sequelize.STRING,
        },
        PorcentajePago: {
            type: Sequelize.INTEGER,
        },
        Usuario: {
            type: Sequelize.STRING,
        },
        PorcentajePagoEsp: {
            type: Sequelize.INTEGER,
        },
        Unidad: {
            type: Sequelize.STRING,
        },
        PorcentajeLab: {
            type: Sequelize.INTEGER,
        },
        FecNac: {
            type: Sequelize.STRING,
        },
    },
        {
            freezeTableName: true
        }
   );
    return OdontologosSchema;
};