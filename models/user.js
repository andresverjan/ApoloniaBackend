module.exports = (sequelize, Sequelize) => {
  const UserSchema = sequelize.define("usuarios", {
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
  });
  return UserSchema;
};
