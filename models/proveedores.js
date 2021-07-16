module.exports = (sequelize, Sequelize) => {
  const Proveedores = sequelize.define(
    'proveedores',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      Nit: {
        type: Sequelize.STRING,
      },
      Nombre: {
        type: Sequelize.STRING,
      },
      Telefono: {
        type: Sequelize.STRING,
      },
      Contacto: {
        type: Sequelize.STRING,
      },
      Observacion: {
        type: Sequelize.STRING,
      },
      Direccion: {
        type: Sequelize.STRING,
      },
      EMPRESA_ID: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
    },
  );
  return Proveedores;
};
