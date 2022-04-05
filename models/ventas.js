module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define(
      'ventas',
      {
        forma_pago: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        fecha_venta: {
          type: Sequelize.DATE,
          allowNull: false
        },
        valor_total_venta: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        iva: {
          type: Sequelize.INTEGER
        },
        usuarioId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        punto_id: {
            type: Sequelize.INTEGER
        },
        ciudad_id: {
            type: Sequelize.INTEGER,
            allowNull: false
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
  
    return Venta;
  };