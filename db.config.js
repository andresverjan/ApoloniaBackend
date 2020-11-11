module.exports = {
    HOST: '142.44.243.85',
    USER: "andy",
    PASSWORD: "Password123456$",
    DB: "ApoloniaOE",
    dialect: "mysql",
    dialectOptions: {
      options: {
        requestTimeout: 3000
      }
    },
    pool: {
      max: 50,
      min: 0,
      acquire: 300000,
      idle: 300000
    }
  };