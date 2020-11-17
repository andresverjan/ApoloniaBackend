module.exports = (sequelize, Sequelize) => {
  const Icono = sequelize.define("materialIconos", {
    nombre: {
      type: Sequelize.STRING
    }
  });
  
  return Icono;
};