module.exports = (sequelize, Sequelize) => {
  const Egresos = sequelize.define(
    'EgresosProgramados',
    {
      T17Nivel1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17Fecha: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      T17Factura: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: true,
      },
      T17Proveedor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17Observacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17Valor: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      T17Clasificacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17FormaPago: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17Banco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17NroCheque: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17Soporte: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17Anulado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17MotivoAnulado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17FechaAnulado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17UsuarioAnulado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17ICA: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      T17IVA: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      T17RF: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      T17Dctos: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      T17Total: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      T17FechaIni: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      T17FechaFin: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      T17NroResolucion: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      T17FacturaPrint: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      T17Cia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17ConsecutivoEG: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      T17ValorLetras: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      T17Girado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      T17Item: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      T17CREE: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  return Egresos;
};
