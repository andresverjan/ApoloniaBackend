module.exports = (sequelize, Sequelize) => {
    const Paciente = sequelize.define("paciente", {
      Cedula: {
        type: Sequelize.INTEGER
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
        type: Sequelize.DATETIME
      },

      TelCasa: {
        type: Sequelize.INTEGER
      },

      TelOficina: {
        type: Sequelize.INTEGER
      },

      Direccion: {
        type: Sequelize.STRING
      },

      Ciudad: {
        type: Sequelize.INTEGER
      },

      Municipio: {
        type: Sequelize.INTEGER
      },

      FechaIngreso: {
        type: Sequelize.DATETIME
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
      
      TipoDoc: {
        type:   Sequelize.ENUM,
        values: ['CC', 'CE', 'PASSPORT']
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
        type: Sequelize.INTEGER
      }
    },
    {
      freezeTableName: true
    });
    return Paciente;
  };