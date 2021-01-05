module.exports = (sequelize, Sequelize) => {
  const UserSchema = sequelize.define(
    "usuarios",
    {
      USUARIO_ID: {
        type: Sequelize.STRING,
      },
      USUARIO_NOMBRE: {
        type: Sequelize.STRING,
      },
      USUARIO_APELLIDO: {
        type: Sequelize.STRING,
      },
      USUARIO_CORREO: {
        type: Sequelize.STRING,
      },
      USUARIO_TELEFONO: {
        type: Sequelize.STRING,
      },
      USUARIO_ACTIVO: {
        type: Sequelize.BOOLEAN,
      },
      USUARIO_LOGIN: {
        type: Sequelize.STRING,
      },
      USUARIO_PASSWORD: {
        type: Sequelize.STRING,
      },
      USUARIO_ELIMINADO: {
        type: Sequelize.BOOLEAN,
      },
      EMPRESA_ID: {
        type: Sequelize.INTEGER,
      },
      PUNTO_ID: {
        type: Sequelize.INTEGER,
      },
      CIUDAD_ID: {
        type: Sequelize.INTEGER,
      },
      FECHA_CREACION: {
        type: Sequelize.STRING,
      },
      MCA_EMPLEADO: {
        type: Sequelize.STRING,
      },
      NOMBRE_CIUDAD: {
        type: Sequelize.STRING,
      },
      NOMBRE_DIRECCION: {
        type: Sequelize.STRING,
      },
      CELULAR: {
        type: Sequelize.STRING,
      },
      URL_FOTO_PERFIL: {
        type: Sequelize.STRING,
      },
      STATUS_ONLINE: {
        type: Sequelize.STRING,
      },
      LATITUD: {
        type: Sequelize.STRING,
      },
      LONGITUD: {
        type: Sequelize.STRING,
      },
      USUARIO_TOKEN: {
        type: Sequelize.STRING,
      },
      USUARIO_NACIMIENTO: {
        type: Sequelize.DATE,
      },
      USUARIO_SEXO: {
        type: Sequelize.STRING,
      },
      FECHA_REGISTRO: {
        type: Sequelize.DATE,
      },
      COUNTRY: {
        type: Sequelize.STRING,
      },
      CODIGOINTERNACIONAL: {
        type: Sequelize.STRING,
      },
      BANDERA: {
        type: Sequelize.STRING,
      },
      IDIOMA_ID: {
        type: Sequelize.INTEGER,
      },
      ROL_ID: {
        type: Sequelize.INTEGER,
      },
      NUMERO_INTENTOS: {
        type: Sequelize.INTEGER,
      },
      MCA_BLOQUEADO_INTENTOS: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return UserSchema;
};
