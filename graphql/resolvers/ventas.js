const db = require("../../models");
const Ventas = db.ventas;
const Stocks = db.stocks;
const VentaStock = db.venta_stock;
const Op = db.Sequelize.Op;
const helpers = require("../../helpers");

module.exports = {
    ventas: async (args) => {
        try {
            let where = {};
            if (args.filter) {
                where = helpers.getFilterFromObject(args.filter);
                if ( args.filter.fechend &&  args.filter.fechend != '' &&
                     args.filter.fechini &&  args.filter.fechini != '' ) {
                    where.where.push({
                        ['fecha_venta']: {
                        [Op.between]: [
                            moment(args.filter.fechini).toDate(),
                            moment(args.filter.fechend).toDate(),
                        ],
                        },
                    });
                }
                where.where = where.where.filter((e) => !(e.hasOwnProperty('fechini') === true ||
                                                          e.hasOwnProperty('fechend') === true ));
            }
            if (args.pagination) {
                let { limite: limit, pagina } = args.pagination;
                pagina =  pagina-1;
                const offset = limit * pagina;
                where = { ...where, limit, offset };
            }
            try {
                let sales = await Ventas.findAll(where, {
                    include: [{
                      model: Stocks,
                      as: "stocks"
                    }]
                });
                const totalRegistros = sales.length;
                return { totalRegistros,  sales };
            } catch (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    },

    productosByVentaId: async (args) => {
        try {            
            return newFields = await VentaStock.findAll({
                attributes: ['stocks.id', 'stocks.codigo', 'stocks.nombre', 'cantidad', 'stocks.valor'],
                distinct: 'stocks.id',
                include: {
                    model: Stocks,
                    as: 'stocks'                    
                },
                where: {
                    venta_id: { [Op.eq]: args.id }
                },
                raw: true
            })             
        } catch (error) {
            throw error;
        }
    },

    saveVenta: async (args) => {
        try {
          const { sale, products } = args.venta;
          let saleId = 0;
          
          await Ventas.create(sale).then((_app) => {
            saleId = _app.id;
            let newFields = products.map(field => {
                return {
                    venta_id:   _app.id,
                    stock_id:   field.id,
                    cantidad:   field.cantidad,
                    sub_total:  field.sub_total,
                    createdAt:  new Date().toISOString(),
                    updatedAt:  new Date().toISOString()
                }
            });        
            VentaStock.bulkCreate(newFields, { validate: true }).then(() => {
            })
            .catch((err) => {
                throw err;
            });
          });
    
          return await Ventas.findOne( { where : { id:  saleId}});
        } catch (error) {
          throw error;
        }
    },

    updateVenta: async (args) => {
        try {
            const { sale, products } = args.venta;
            let newFields = products.map(field => {
                return {
                    venta_id:   _app.id,
                    stock_id:   field.id,
                    cantidad:   field.quantity,
                    createdAt:  new Date().toISOString(),
                    updatedAt:  new Date().toISOString()
                }
            });    

            await Ventas.update({   fecha_venta: sale.fecha_venta,
                                    forma_pago: sale.forma_pago,
                                    valor_total_venta: sale.valor_total_venta,
                                    iva: sale.iva,
                                    usuarioId: sale.usuarioId,
                                    punto_id: sale.punto_id,
                                    ciudad_id: sale.ciudad_id,
                                    updatedAt: new Date().toISOString()
                                }, 
                                { where: { id: sale.id }}).then(() => {

                VentaStock.destroy({ where : { venta_id: sale.id }}).then(() => {
                    VentaStock.bulkCreate(newFields, { validate: true }).then(() => {})
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
            
            return await Ventas.findOne({ where: { id: sale.id }});
        } catch (error) {
            throw error;
        }
    },

    productos: async (args) => {
        try {
            return newFields = await Stocks.findAll({
              attributes: ['id'],
              distinct: 'id',
              include: {
                model: Ventas,
                through: 'venta_stock', 
                distinct: 'id',
                as: 'ventas',
                where: {
                  id: { [Op.eq]: args.ventaId }
                }  
              },
              raw: true
            })
            .then((goes) => goes.map((i) => i.id))
            .then((ids) => Stocks.findAll({
              attributes: ['id', 'codigo', 'nombre'],     
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

    products: async (args) => {
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFromObjectAllLike(args.filter);
            }
            if (args.order != null && args.order != undefined) {
                where.order = helpers.getOrderFromObject(args.order);
            }
            return (newFields = await Stocks.findAll(where));
        } catch (error) {
            throw error;
        }
    }
};