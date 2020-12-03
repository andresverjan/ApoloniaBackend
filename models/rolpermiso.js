module.exports = (sequelize, Sequelize) => {
    const RolPermiso = sequelize.define("rol_permiso", {
        rol_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        permiso_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, 
    {   
        freezeTableName: true
    });
    return RolPermiso;
  };