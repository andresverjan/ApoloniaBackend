module.exports = (sequelize, Sequelize) => {
    const CitaEstado = sequelize.define("citasestados", {
        nombre: {
            type: Sequelize.STRING,
        },
        color: {
            type: Sequelize.STRING,
        },
        textColor: {
            type: Sequelize.STRING,
        },
        borderColor: {
            type: Sequelize.STRING,
        }
    },
    { 
        freezeTableName: true
    });
    return CitaEstado;
};