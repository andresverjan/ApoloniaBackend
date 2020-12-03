const db = require("../../models");
const helpers = require("../../helpers");
const Application = db.application;

module.exports = {
  genericList: async (args) => {
    const { id, campos } = args.filter;

    try {
      let condicion = "";
      condicion = campos
        ? campos
            .map((field, i) => {
              if (i == 0) {
                return ` ${field.nombre} like '%${field.valor}%'  `;
              } else {
                return `and ${field.nombre} like '%${field.valor}%' `;
              }
            })
            .join()
        : "";

      //REPLACEALL NO ESTÁ SOPORTADO AÚN
      condicion = condicion.split(",").join(" ");

      //PAGINATION
      let limitQueryStr = "";
      const { pagina, limite } = args.limit;

      const res = await db.sequelize.query(
        "CALL countGenericList (:APPLICATION_ID, :CONDICION)",
        {
          replacements: {
            APPLICATION_ID: id,
            CONDICION: condicion,
          },
        }
      );

      let totalRegistros = res.map((val) => {
        return val["COUNT(*)"];
      });

      totalRegistros = Number.parseInt(totalRegistros[0]);

      const start = limite * pagina - limite;

      limitQueryStr = ` limit ${start},${limite}`;

      console.log(limitQueryStr);

      const application = await Application.findOne({ where: { id: id } });

      const result = await db.sequelize.query(
        "CALL genericList (:APPLICATION_ID, :CONDICION, :LIMITE)",
        {
          replacements: {
            APPLICATION_ID: id,
            CONDICION: condicion,
            LIMITE: limitQueryStr,
          },
        }
      );

      let newFields = result.map((field) => {
        if (field.createdAt) {
          field.createdAt = helpers.convertDateTimeIsoToString(field.createdAt);
        }
        return JSON.stringify(field);
      });
      const r = {
        application,
        campos: newFields,
        totalRegistros,
      };

      return [r];
    } catch (error) {
      throw error;
    }
  },
  genericSave: async (args) => {
    console.log("INGRESO A genericSave");
    const { application, campos } = args.application;
    try {
      let columnas = campos
        .map((field) => {
          return "`" + field.nombre + "`";
        })
        .join();
      let values = campos
        .map((field) => {
          if (field.nombre == "createdAt" || field.nombre == "updatedAt") {
            if (field.valor != "") {
              field.valor = helpers.convertDateTimeIsoToString(field.valor);
            } else {
              let d = new Date();
              field.valor = helpers.convertDateTimeIsoToString(d);
            }
          }
          return "'" + field.valor + "'";
        })
        .join();
      const result = await db.sequelize
        .query("CALL genericSave (:APPLICATION_ID, :COLUMNAS, :VALUES )", {
          replacements: {
            APPLICATION_ID: application.id,
            COLUMNAS: columnas,
            VALUES: values,
          },
        })
        .then((v) => {
          let genericResponse = {
            success: true,
            message: "",
            internalMessage: "",
          };
          return genericResponse;
        })
        .catch(function (err) {
          let genericResponse = {
            success: false,
            message: "Problemas Guardando Intente Nuevamente.. ",
            internalMessage: err.original.sqlMessage,
          };
          return genericResponse;
        });
      return result;
    } catch (error) {
      console.log("ENTRO A THROW ERROR!");
      throw error;
    }
  },
  genericUpdate: async (args) => {
    console.log("INGRESO A genericUpdate");
    const { id, application, campos } = args.application;
    try {
      let columnas = campos
        .map((field) => {
          if (field.tipoCampoId == 4) {
            field.valor = field.valor == "true" ? 1 : 0;
          }
          if (field.nombre == "createdAt" || field.nombre == "updatedAt") {
            field.valor = helpers.convertDateTimeIsoToString(field.valor);
          }
          return "`" + field.nombre + "`" + "=" + "'" + field.valor + "'";
        })
        .join();
      console.log(columnas);
      const result = await db.sequelize
        .query("CALL genericUpdate ( :ROW_ID, :APPLICATION_ID, :COLUMNAS )", {
          replacements: {
            ROW_ID: id,
            APPLICATION_ID: application.id,
            COLUMNAS: columnas,
          },
        })
        .then((v) => {
          let genericResponse = {
            success: true,
            message: "",
            internalMessage: "",
          };
          return genericResponse;
        })
        .catch(function (err) {
          let genericResponse = {
            success: false,
            message: "Problemas Actualizando intente nuevamente.. ",
            internalMessage: err.original.sqlMessage,
          };
          return genericResponse;
        });
      return result;
    } catch (error) {
      console.log("ENTRO A THROW ERROR!");
      throw error;
    }
  },

  genericDelete: async (args) => {
    console.log("INGRESO A genericDelete");
    const { id, application } = args.application;

    let genericResponse = {
      success: false,
      message: "Problemas Eliminando intente nuevamente.. ",
      internalMessage: "",
    };

    try {
      if (id != 0 && application != null && application.id != 0) {
        const result = await db.sequelize
          .query("CALL genericDelete ( :ROW_ID, :APPLICATION_ID )", {
            replacements: { ROW_ID: id, APPLICATION_ID: application.id },
          })
          .then((v) => {
            let genericResponse = {
              success: true,
              message: "",
              internalMessage: "",
            };
            return genericResponse;
          })
          .catch(function (err) {
            genericResponse = {
              success: false,
              message: "Problemas Eliminando intente nuevamente.. ",
              internalMessage: err.original.sqlMessage,
            };
            return genericResponse;
          });
        return result;
      } else {
        return genericResponse;
      }
    } catch (error) {
      console.log("ENTRO A THROW ERROR!");
      throw error;
    }
  },
};
