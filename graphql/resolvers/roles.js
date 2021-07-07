const db = require("../../models");
const Roles = db.rol;
const Permiso = db.permiso;
const RolPermiso = db.rolPermiso;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");

module.exports = {
    roles: async (args) => {
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }

            const roles= list = await Roles.findAll(where, {
                include: [
                {
                  model: Permiso,
                  as: "permisos"
                },
              ],});

            return roles;
        } catch (error) {
            throw error;
        }
    },

    rolById: async (args) => {
        try {
            const rol = await Roles.findByPk(args.id, {
                attributes: ['nombre'],
                include: [
                    {
                    model: Permiso,
                    as: "permisos"
                    },
                ]});
            return rol;
        } catch (error) {
            throw error;
        }
    },

    rolByNombre: async (args) => {
        try {            
            let where = {
                nombre: args.nombre
            };
            
            const rol = await Roles.findOne({
                where, 
                attributes: ['nombre'],
                include: [
                    {
                    model: Permiso,
                    as: "permisos"
                    },
                ] 
            });
            console.log("Rol: ", rol);
            return rol;
        } catch (error) {
            throw error;
        }
    },

    permisos: async (args) => {
        try {
            return newFields = await Permiso.findAll({
                attributes: ['id'],
                distinct: 'id',
                include: {
                    model: Roles,
                    through: 'rol_permiso', 
                    distinct: 'id',
                    as: 'roles',
                    where: {
                        id: { [Op.eq]: args.rol_id }
                    }
                },
                raw: true
            })
            .then((goes) => goes.map((i) => i.id))
            .then((ids) => Permiso.findAll({
                attributes: ['id', 'nombre'],     
                where: {
                    id: { [Op.notIn]: ids }
                }
            })).catch(err => {
                throw err;
            });             
        } catch (error) {
            throw error;
        }
    },

    updateRol: async (args) => {
        try {
            let  rolId = 0;
            rolId = args.rol.id;
            let newFields = args.rol.permisos.map(field => {
                return {
                    rol_id:     args.rol.id,
                    permiso_id: field.id,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            });    

            await Roles.update({ updatedAt: new Date().toISOString()}, { where: { id: rolId }})
                .then(() => {
                    
                RolPermiso.destroy({ where : { rol_id: rolId }}).then(() => {

                    RolPermiso.bulkCreate(newFields, { validate: true }).then(() => {})
                    .catch((err) => {
                        throw err;
                    });
                })
                .catch((err) => {
                    throw err;
                });
            }).catch(err => {
                throw err;
            });
              
            return await Roles.findOne( { where : { id:  rolId}});
        } catch (error) {
            throw error;
        }
    }
};