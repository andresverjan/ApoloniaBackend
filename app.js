const Express = require("express");
const ExpressGraphQL = require("express-graphql");
const types = require('./graphql/schema/index')
const genericResolver = require('./graphql/resolvers')
var cors = require("cors");

const {buildSchema } = require("graphql");
const schema = buildSchema(types);
var app = Express();
app.use('*', cors());
app.use("/api", ExpressGraphQL({
    schema:    schema,
    rootValue: genericResolver,
    graphiql: true
}));

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});