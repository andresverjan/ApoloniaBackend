const dbConfig = require('../db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    dialectOptions: dbConfig.dialectOptions,
    timezone: dbConfig.timezone,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  },
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

console.log('****************************');
console.log('Runing some Queries!....');
const TIME_OUT = 'SET GLOBAL connect_timeout=60000;';
const INTERACTIVE_TIME_OUT =
  'SET GLOBAL interactive_timeout=28800;';
const WAIT_TIME_OUT = 'SET GLOBAL wait_timeout=28800;';
const SHOW_VARIABLES = 'SHOW VARIABLES;';

sequelize.query(TIME_OUT);
sequelize.query(INTERACTIVE_TIME_OUT);
sequelize.query(WAIT_TIME_OUT);

sequelize.query(SHOW_VARIABLES).then(function (result) {
  console.log(result);
});
console.log('DONE');
console.log('****************************');

db.tutorials = require('../models/tutorial')(
  sequelize,
  Sequelize,
);
db.comment = require('../models/comment')(
  sequelize,
  Sequelize,
);
db.etiquetas = require('../models/etiquetas')(
  sequelize,
  Sequelize,
);
db.users = require('../models/user')(sequelize, Sequelize);
db.idiomas = require('../models/idioma')(
  sequelize,
  Sequelize,
);
db.iconos = require('../models/icono')(
  sequelize,
  Sequelize,
);
db.tipocampos = require('../models/tipocampos')(
  sequelize,
  Sequelize,
);
db.mascara = require('../models/mascara')(
  sequelize,
  Sequelize,
);
db.application = require('../models/applications')(
  sequelize,
  Sequelize,
);
db.campos = require('../models/applicationFieldsConfig')(
  sequelize,
  Sequelize,
);
db.rol = require('../models/rol')(sequelize, Sequelize);
db.permiso = require('../models/permiso')(
  sequelize,
  Sequelize,
);
db.paciente = require('../models/paciente')(
  sequelize,
  Sequelize,
);
db.servicio = require('../models/servicio')(
  sequelize,
  Sequelize,
);

db.citas = require('../models/citas')(sequelize, Sequelize);
db.odontologos = require('../models/odontologos')(
  sequelize,
  Sequelize,
);
db.esterilizaciones = require('../models/esterilizaciones')(
  sequelize,
  Sequelize,
);
db.dispositivos = require('../models/dispositivos')(
  sequelize,
  Sequelize,
);
db.citashc = require('../models/citasHC')(
  sequelize,
  Sequelize,
);
db.citaTrazabilidad = require('../models/citaTrazabilidad')(
  sequelize,
  Sequelize,
);
db.recordatorios = require('../models/recordatorios')(
  sequelize,
  Sequelize,
);
db.stocks = require('../models/stocks')(sequelize, Sequelize);
db.ventas = require('../models/ventas')(sequelize,Sequelize);

db.tutorials.hasMany(db.comment, { as: 'comments' });
db.comment.belongsTo(db.tutorials, {
  foreignKey: 'tutorialId',
  as: 'tutorial',
});

db.application.hasMany(db.campos, {
  onDelete: 'CASCADE',
  as: 'fields',
});

db.campos.belongsTo(db.application, {
  foreignKey: 'applicationId',
  onDelete: 'CASCADE',
  as: 'application',
});

db.campos.belongsTo(db.tipocampos, {
  foreignKey: 'tipoCampoId',
  as: 'tipocampos',
});

db.mascara.hasMany(db.campos, { as: 'fields' });
db.campos.belongsTo(db.mascara, {
  foreignKey: 'mascaraId',
  as: 'mascara',
});
db.rol_permiso = require('../models/rolpermiso')(
  sequelize,
  Sequelize,
);
db.rol.belongsToMany(db.permiso, {
  through: 'rol_permiso',
  as: 'permisos',
  foreignKey: 'rol_id',
  primaryKey: true,
});

db.permiso.belongsToMany(db.rol, {
  through: 'rol_permiso',
  as: 'roles',
  foreignKey: 'permiso_id',
  primaryKey: true,
});

db.venta_stock = require('../models/ventaStock')(
  sequelize,
  Sequelize,
);
db.ventas.belongsToMany(db.stocks, {
  through: 'venta_stock',
  as: 'stocks',
  foreignKey: 'stock_id',
  primaryKey: true,
});

db.stocks.belongsToMany(db.ventas, {
  through: 'venta_stock',
  as: 'ventas',
  foreignKey: 'venta_id',
  primaryKey: true,
});

db.users.hasMany(db.ventas, { as: 'ventas' });
db.ventas.belongsTo(db.users, {
  foreignKey: 'usuarioId',
  onUpdate: 'CASCADE',
  as: 'usuarios',
});

db.odontologos.hasMany(db.citas, {
  onDelete: 'CASCADE',
  as: 'citas',
});

db.citas.belongsTo(db.odontologos, {
  foreignKey: 'odontologoId',
  onDelete: 'CASCADE',
  as: 'odontologos',
});

db.paciente.hasMany(db.citas, { as: 'citas' });
db.citas.belongsTo(db.paciente, {
  foreignKey: 'pacienteId',
  onDelete: 'CASCADE',
  as: 'paciente',
});

db.servicio.hasMany(db.citas, { as: 'citas' });
db.citas.belongsTo(db.servicio, {
  foreignKey: 'servicioId',
  onDelete: 'CASCADE',
  as: 'servicio',
});

db.users.hasMany(db.citas, { as: 'citas' });
db.citas.belongsTo(db.users, {
  foreignKey: 'usuarioId',
  onUpdate: 'CASCADE',
  as: 'usuarios',
});

db.status = require('../models/citaEstado')(
  sequelize,
  Sequelize,
);

db.configDashboard =
  require('../models/configDashboard')(
    sequelize,
    Sequelize,
  );
db.configuracionParametros =
  require('../models/configuracionParametro')(
    sequelize,
    Sequelize,
  );
db.egresos = require('../models/egresos')(
  sequelize,
  Sequelize,
);

db.egresos = require('../models/egresos')(
  sequelize,
  Sequelize,
);

/***EVOLUCIONES MODELS*/
db.evolucionesRemision = require('../models/evoluciones/remision')(
  sequelize,
  Sequelize,
);

db.evolucionesEventos = require('../models/evoluciones/eventos')(
  sequelize,
  Sequelize,
);

db.evolucionesLaboratorios = require('../models/evoluciones/laboratorios')(
  sequelize,
  Sequelize,
);

db.evolucionesRecetario = require('../models/evoluciones/recetario')(
  sequelize,
  Sequelize,
);

db.evolucionesEsterilizacion = require('../models/evoluciones/esterilizacion')(
  sequelize,
  Sequelize,
);

db.rol_permiso.belongsTo(db.rol, {
  as: 'roles',
  foreignKey: 'rol_id',
});
db.rol_permiso.belongsTo(db.permiso, {
  as: 'permisos',
  foreignKey: 'permiso_id',
});

db.esterilizacionesDispositivos = require('../models/esterilizacionDispositivo')(
  sequelize,
  Sequelize,
);

db.tipoEmpaque = require('../models/tipoEmpaque')(
  sequelize,
  Sequelize,
);

db.esterilizaciones.belongsToMany(db.dispositivos, {
  through: 'esterilizacionesDispositivos',
  as: 'dispositivos',
  foreignKey: 'esterilizacionId',
  primaryKey: true,
});

db.dispositivos.belongsToMany(db.esterilizaciones, {
  through: 'esterilizacionesDispositivos',
  as: 'esterilizaciones',
  foreignKey: 'dispositivoId',
  primaryKey: true,
});

db.esterilizacionesDispositivos.belongsTo(db.esterilizaciones, {
  as: 'esterilizaciones',
  foreignKey: 'esterilizacionId',
});

db.esterilizacionesDispositivos.belongsTo(db.dispositivos, {
  as: 'dispositivos',
  foreignKey: 'dispositivoId',
});

db.tipoEmpaque.hasMany(db.esterilizacionesDispositivos, { as: 'esterilizacionesDispositivos' });
db.esterilizacionesDispositivos.belongsTo(db.tipoEmpaque, {
  foreignKey: 'tiposEmpaqueEsterilizacionId',
  onDelete: 'CASCADE',
  as: 'tipoEmpaque'
});

db.egresosProgramados =
  require('../models/egresosProgramados')(
    sequelize,
    Sequelize,
  );

db.tipospagos = require('../models/tipospagos')(
  sequelize,
  Sequelize,
);
db.proveedores = require('../models/proveedores')(
  sequelize,
  Sequelize,
);

db.empresa = require('../models/empresa')(
  sequelize,
  Sequelize,
);

db.venta_stock.belongsTo(db.stocks, {
  as: 'stocks',
  foreignKey: 'stock_id'
});
db.venta_stock.belongsTo(db.ventas, {
  as: 'ventas',
  foreignKey: 'venta_id'
});

module.exports = db;
