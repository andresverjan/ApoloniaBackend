module.exports = (sequelize, Sequelize) => {
    const Paciente = sequelize.define("paciente", {
      Cedula: {
        type: Sequelize.STRING
      },

      TipoDoc: {
        type:   Sequelize.ENUM,
        values: ['CC', 'CE', 'PASSPORT']
      },
      
      Apellidos1: {
        type: Sequelize.STRING
      },

      Apellidos2: {
        type: Sequelize.STRING
      },

      Nombres1: {
        type: Sequelize.STRING
      },
      
      Nombres2: {
        type: Sequelize.STRING
      },
      
      FechaNacimiento: {
        type: Sequelize.DATE
      },

      TelCasa: {
        type: Sequelize.STRING
      },

      TelOficina: {
        type: Sequelize.STRING
      },

      Direccion: {
        type: Sequelize.STRING
      },

      Ciudad: {
        type: Sequelize.STRING
      },

      Municipio: {
        type: Sequelize.STRING
      },

      FechaIngreso: {
        type: Sequelize.DATE
      },

      Sexo: {
        type: Sequelize.ENUM,
        values: ['Masculino', 'Femenino', 'Intersexual']
      },

      RemitidoPor: {
        type: Sequelize.STRING
      },

      Ocupacion: {
        type: Sequelize.STRING
      },
      
      Mail: {
        type: Sequelize.STRING
      },

      Contacto: {
        type: Sequelize.STRING
      },

      EstadoCivil: {
        type:   Sequelize.ENUM,
        values: ['Soltero', 'Casado', 'Separado', 'Unión Libre', 'Viudo']
      },

      Nacionaliad: {
        type: Sequelize.STRING
      },
      
      EPS: {
        type: Sequelize.STRING
      },

      EMPRESA_ID: {
        type: Sequelize.INTEGER,
        default: 1
      }
    },
    {
      freezeTableName: true
    });
    return Paciente;
  };