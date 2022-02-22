module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define(
      'stocks',
      {
        codigo: {
          type: Sequelize.STRING,
          allowNull: false
        },
        nombre: {
          type: Sequelize.STRING,
          allowNull: false
        },
        descripcion: {
          type: Sequelize.STRING
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        activo: {
          type: Sequelize.BOOLEAN,
          default: false
        },
        eliminado: {
          type: Sequelize.BOOLEAN,
          default: false
        },
        valor: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        fecha: {
          type: Sequelize.DATE,
          allowNull: false
        },
        iva: {
          type: Sequelize.INTEGER
        },
        EMPRESA_ID: {
            type: Sequelize.INTEGER,
            default: 1,
        }
      },
      {
        freezeTableName: true,
      }
    );
    return Stock;
  };