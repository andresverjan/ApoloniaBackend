const db = require("../../models");
const Users = db.users;
const Idioma = db.idiomas;
const Etiquetas = db.etiquetas;



module.exports = {
    login: async (args) => {
        const { username, password } = args;
        try {

            const usr = await Users.findOne({ where: { USUARIO_LOGIN: username, USUARIO_PASSWORD: password } });
            if (usr != null) {
                const permisos = await db.sequelize.query('CALL login(:USERNAME, :USERPASS)',
                    { replacements: { USERNAME: username, USERPASS: password, } });
                let usrFinal = {
                    ...usr.dataValues,
                    PERMISOS : permisos
                };
                let idiomaId = usrFinal.IDIOMA_ID?usrFinal.IDIOMA_ID:1;
                if (idiomaId != null ) {
                    const idioma = await Idioma.findOne({ where: { ID:  idiomaId} });
                    usrFinal = {
                        ...usrFinal, 
                        IDIOMA: idioma.dataValues
                    };
                    const etiquetas = await Etiquetas.findAll({ where: { IDIOMA_ID:  idiomaId} });
                    usrFinal = {
                        ...usrFinal, 
                        ETIQUETAS: etiquetas
                    };                    
                }
                return usrFinal;
            }
        } catch (error) {
            throw error;
        }
    },
    updatePassword: async (args) => {
        const usuario = Users.findOne({where:{USUARIO_CORREO: args.password.USUARIO_CORREO}});
        usuario.USUARIO_PASSWORD= args.password.USUARIO_PASSWORD
        try {
          return await Users.update(usuario, {
            where: { USUARIO_CORREO: args.password.USUARIO_CORREO},
          }).then((data) => {
          });
        } catch (error) {
          throw error;
        }
      },
      updateUser: async (args) => {
        try {
          const{
            User:user
          }=args
          const newUser = Users.update({ USUARIO_NOMBRE: user.USUARIO_NOMBRE, USUARIO_APELLIDO: user.USUARIO_APELLIDO, IDIOMA_ID: user.IDIOMA_ID, USUARIO_CORREO: user.USUARIO_CORREO, USUARIO_TELEFONO: user.USUARIO_TELEFONO, updatedAt: new Date().toISOString() }, {
            where: { id: user.ID }
          })
          .then(() => {
            console.log(newUser)
        }).catch(err => {
            throw err;
          })
          return await Users.findOne({ where: { ID: user.ID } });
        } catch (error) {
          throw error;
        }
      },

};