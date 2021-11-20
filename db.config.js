module.exports = {
  HOST: '142.44.243.85',
  USER: "andy",
  PASSWORD: "Password123456$",
  DB: "ApoloniaOE",
  dialect: "mysql",
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
  timezone: '-05:00',
  pool: {
    max: 150,
    min: 1,
    acquire: 300000,
    idle: 300000
  }
};