const db = require("../../models");
const helpers = require("../../helpers");
const Users = db.users;
const Idioma = db.idiomas;
const Etiquetas = db.etiquetas;
const Campo = db.campos;
const Op = db.Sequelize.Op;

module.exports = {
    login: async (args) => {
        console.log("INGRESO A getUserMenu");
        console.log(args);
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
                console.log(usrFinal);
                return usrFinal;
            }
        } catch (error) {
            throw error;
        }
    },
    updatePassword: async (args) => {
        console.log("INGRESO A updatePassword");
        console.log(args.password);
        const usuario = Users.findOne({where:{id: args.password.ID}});
        console.log(usuario);
        usuario.USUARIO_PASSWORD= args.password.USUARIO_PASSWORD
        try {
            console.log('Entro al try')
          return await Users.update(usuario, {
            where: { id: args.password.ID},
          }).then((data) => {
              
            console.log(data);
          });
          
        } catch (error) {
          throw error;
        }
      },


};