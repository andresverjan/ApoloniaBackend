const db = require("../../models");
const Users = db.users;
const Idioma = db.idiomas;
const Etiquetas = db.etiquetas;
const Pacientes = db.paciente;
const Odontologos = db.odontologos;
const Servicios = db.servicio;
const ConfiguracionParametro = db.configuracionParametros;
const nodemailer = require("nodemailer");

//const request = require("request");
const btoa = require("btoa");
const https = require("https");
var request = require('request');

module.exports = {
  login: async (args) => {
    const { username, password } = args;
    try {
      const usr = await Users.findOne({
        where: { USUARIO_LOGIN: username, USUARIO_PASSWORD: password },
      });
      if (usr != null) {
        const permisos = await db.sequelize.query(
          "CALL login(:USERNAME, :USERPASS)",
          { replacements: { USERNAME: username, USERPASS: password } }
        );
        let usrFinal = {
          ...usr.dataValues,
          PERMISOS: permisos,
        };
        let idiomaId = usrFinal.IDIOMA_ID ? usrFinal.IDIOMA_ID : 1;
        if (idiomaId != null) {
          const idioma = await Idioma.findOne({ where: { ID: idiomaId } });
          usrFinal = {
            ...usrFinal,
            IDIOMA: idioma.dataValues,
          };
          const etiquetas = await Etiquetas.findAll({
            where: { IDIOMA_ID: idiomaId },
          });
          usrFinal = {
            ...usrFinal,
            ETIQUETAS: etiquetas,
          };
        }
        return usrFinal;
      }
    } catch (error) {
      throw error;
    }
  },
  updatePassword: async (args) => {
    const usuario = Users.findOne({
      where: { USUARIO_CORREO: args.password.USUARIO_CORREO },
    });
    usuario.USUARIO_PASSWORD = args.password.USUARIO_PASSWORD;
    try {
      return await Users.update(usuario, {
        where: { USUARIO_CORREO: args.password.USUARIO_CORREO },
      }).then((data) => { });
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (args) => {
    try {
      const { User: user } = args;
      const newUser = Users.update(
        {
          USUARIO_NOMBRE: user.USUARIO_NOMBRE,
          USUARIO_APELLIDO: user.USUARIO_APELLIDO,
          IDIOMA_ID: user.IDIOMA_ID,
          USUARIO_CORREO: user.USUARIO_CORREO,
          USUARIO_TELEFONO: user.USUARIO_TELEFONO,
          updatedAt: new Date().toISOString(),
        },
        {
          where: { id: user.id },
        }
      )
        .then(() => { })
        .catch((err) => {
          throw err;
        });
      return await Users.findOne({ where: { id: user.id } });
    } catch (error) {
      throw error;
    }
  },
  updateIdiom: async (args) => {
    const usuario = Users.findOne({
      where: { USUARIO_CORREO: args.idiom.USUARIO_CORREO },
    });
    usuario.IDIOMA_ID = args.idiom.IDIOMA_ID;
    try {
      return await Users.update(usuario, {
        where: { USUARIO_CORREO: args.idiom.USUARIO_CORREO },
      }).then((data) => { });
    } catch (error) {
      throw error;
    }
  },
  sendReminder: async (args) => {
    const { USUARIO_CORREO, cita } = args.email;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "developteamcol@gmail.com",
        pass: "devteam123$",
      },
    });

    const paciente = await Pacientes.findOne({
      where: { id: cita.pacienteId },
    });
    const odontologo = await Odontologos.findOne({
      where: { id: cita.odontologoId },
    });
    const servicio = await Servicios.findOne({
      where: { id: cita.servicioId },
    });

    const mailOptions = {
      from: "developteamcol@gmail.com",
      to: USUARIO_CORREO,
      subject: `Recordatorio cita odontológica: ${paciente.Nombres1} ${paciente.Apellidos1}`,
      html: `
      
      <h1>Señor ${paciente.Nombres1} ${paciente.Apellidos1
        }. Tiene cita de odontología pronto!</h1>
      
      <h2><strong>Información de la cita:</strong></h2>

      <ul>

        <li>
          <h4><strong>Título:</strong></h4> ${cita.title}
        </li>

        <li>
          <h4><strong>Hora de inicio:</strong></h4>${cita.start
          .split("T")[1]
          .substr(0, 5)}
        </li>
      
        <li>
          <h4><strong>Odontólogo:</strong></h4> ${odontologo.Nombres} ${odontologo.Apellidos
        }
        </li>

        <li>
          <h4><strong>Tipo de cita:</strong></h4> ${servicio.nombre}
        </li>

      </ul>

      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return "Error";
      } else {
        console.log(info.response);
        return "Email sent: " + info.response;
      }
    });
    return "Email enviado";
  },

  sendsms: async (args) => {
    try {
      let usuario, token, url;
      (await ConfiguracionParametro.findAll({
        where: {
          GrupoParametro: "SMS_CONFIG"
        }, 
        attributes: ['NombreParametro', 'Valor']
      })).map((field) => {
        if (field.NombreParametro == "usuario") {
          usuario = field.Valor;
        } else if (field.NombreParametro == "token") {
          token = field.Valor;
        } else if (field.NombreParametro == "url") {
          url = field.Valor;
        };
      });

      const dato = JSON.stringify(args.msg);
      var options = {
        'method': 'POST',
        'url': url,//'https://api.labsmobile.com/json/send',
        'headers': {
          'Authorization': 'Basic ' + btoa(usuario + ':' + token),
          'Content-Type': 'application/json'
        },
        body: dato
      };

      return request(options, function (error, response) {
        if (error) throw new Error(error);
        return res = JSON.parse(response.body);
      });
       
    } catch (error) {      
        throw error;
    }
  },

  configByParamGroup: async (args) => {
    try {            
      return configParam = list = await ConfiguracionParametro.findAll({
        where: {
          GrupoParametro: args.paramGroup
        }, 
          attributes: ['NombreParametro', 'Valor']
      });
    } catch (error) {
        throw error;
    }
  },
};
