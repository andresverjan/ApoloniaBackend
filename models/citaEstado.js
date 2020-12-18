module.exports = (sequelize, Sequelize) => {
    const CitaEstado = sequelize.define("citasestados", {
        nombre: {
            type: Sequelize.STRING,
        },

        color: {
            type: Sequelize.STRING,
        }
    },
    { 
        freezeTableName: true
    });
    return CitaEstado;
};