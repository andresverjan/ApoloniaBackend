module.exports = (sequelize, Sequelize) => {
    const EsterilizacionesDispositivos = sequelize.define("esterilizacionesDispositivos", {
        esterilizacionId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        dispositivoId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tiposEmpaqueEsterilizacionId: {
            type: Sequelize.INTEGER,
            foreingKey: true,
            allowNull: false
        } 
    }, 
    {   
        freezeTableName: true
    });
    return EsterilizacionesDispositivos;
  };