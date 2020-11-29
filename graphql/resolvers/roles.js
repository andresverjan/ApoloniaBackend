const db = require("../../models");
const Roles = db.rol;
const Permiso = db.permiso;
//const Op = db.Sequelize.Op;
const helpers = require("../../helpers");

module.exports = {
    roles: async (args) => {
        console.log("INGRESO A ROLEX");
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
            const roles= list = await Roles.findAll({include: [
                {
                  model: Permiso,
                  as: "permisos"
                },
              ],});
            console.log("Roles: ", roles);
            return roles;
        } catch (error) {
            throw error;
        }
    },

    rolById: async (args) => {
        console.log("CONSULTA ROLES POR ID");
        try {
            
            const rol = await Roles.findByPk(args.id, {include: [
                {
                  model: Permiso,
                  as: "permisos"
                },
              ],});
            console.log("Rol: ", rol);
            return rol;
        } catch (error) {
            throw error;
        }
    },
    rolByNombre: async (args) => {
        console.log("CONSULTA ROLES POR NOMBRE", args.nombre);
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
        console.log("INGRESO A PERMIXOX");
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObject(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
            return list = await Permiso.findAll(where, {include: [
                {
                  model: Roles,
                  as: "roles"
                },
              ],});
        } catch (error) {
            throw error;
        }
    },

};