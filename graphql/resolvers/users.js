const db = require("../../models");
const Users = db.users;
const Idioma = db.idiomas;
const Etiquetas = db.etiquetas;
const nodemailer = require("nodemailer");

module.exports = {
  login: async (args) => {
    console.log("INGRESO A getUserMenu");
    console.log(args);
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
        console.log(usrFinal);
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
      }).then((data) => {
        console.log(data);
      });
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
      }).then((data) => {
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  },

  sendReminder: async (args) => {
    const { USUARIO_CORREO } = args.email;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "developteamcol@gmail.com",
        pass: "devteam123$",
      },
    });

    const mailOptions = {
      from: "developteamcol@gmail.com",
      to: USUARIO_CORREO,
      subject: "Recordatorio Cita",
      html: "<h1>Tienes cita de odontología pronto!</h1>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return "Error";
      } else {
        return "Email sent: " + info.response;
      }
    });

    return "Email enviado";
  },
};
