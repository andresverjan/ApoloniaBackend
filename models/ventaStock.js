module.exports = (sequelize, Sequelize) => {
    const VentaStock = sequelize.define("venta_stock", {
        venta_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        stock_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        cantidad: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
    }, 
    {   
        freezeTableName: true
    });
    return VentaStock;
  };