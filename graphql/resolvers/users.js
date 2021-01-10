const db = require("../../models");
const Users = db.users;
const Idioma = db.idiomas;
const Etiquetas = db.etiquetas;
const Pacientes = db.paciente;
const Odontologos = db.odontologos;
const Servicios = db.servicio;
const nodemailer = require("nodemailer");

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
      }).then((data) => {});
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
        .then(() => {})
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
      }).then((data) => {});
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
      
      <h1>Señor ${paciente.Nombres1} ${
        paciente.Apellidos1
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
          <h4><strong>Odontólogo:</strong></h4> ${odontologo.Nombres} ${
        odontologo.Apellidos
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
};
