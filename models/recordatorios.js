module.exports = (sequelize, Sequelize) => {
    const Recordatorio = sequelize.define(
      'recordatorios',
      {
        NOMBRE: {
          type: Sequelize.STRING,
          allowNull: true
        },
        NOTA: {
          type: Sequelize.STRING,
          allowNull: true
        },
        DESCRIPCION: {
          type: Sequelize.STRING,
          allowNull: true
        },
        FECHAHORARECORDAR: {
            type: Sequelize.DATE
        },
        ACTIVO: {
            type: Sequelize.STRING,
            default: 'S',
        },
        REPETIRDIARIO: {
            type: Sequelize.STRING,
            default: 'S',
        },
        REPETIRMENSUAL: {
            type: Sequelize.STRING,
            default: 'S',
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
  