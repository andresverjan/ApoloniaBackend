module.exports = (sequelize, Sequelize) => {
    const Recordatorio = sequelize.define(
      'recordatorios',
      {
        nombre: {
          type: Sequelize.STRING,
          allowNull: true
        },
        repetir: {
          type: Sequelize.BOOLEAN,
          default: false,
        },
        observaciones: {
          type: Sequelize.STRING,
          allowNull: true
        },
        active: {
          type: Sequelize.BOOLEAN,
          default: false
        },
        fechaRecordatorio: {
          type: Sequelize.DATE
        },
        repetirCadaTimes: {
          type: Sequelize.INTEGER
        },
        repetirCada: {
          type: Sequelize.INTEGER
        },
        endsNever: {
          type: Sequelize.BOOLEAN,
          default: false,
        },
        endsOn: {
          type: Sequelize.DATE
        },
        endsAfter: {
          type: Sequelize.INTEGER
        },
        createdBy: {
          type: Sequelize.INTEGER
        },
        EMPRESA_ID: {
            type: Sequelize.INTEGER,
            default: 1,
        }
      },
      {
        freezeTableName: true,
      },
    );
  
    return Recordatorio;
  };
  