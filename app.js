const Express = require('express');
const ExpressGraphQL = require('express-graphql');
const compression = require('compression');
const types = require('./graphql/schema/index');
const genericResolver = require('./graphql/resolvers');
var cors = require('cors');
const { buildSchema } = require('graphql');
const schema = buildSchema(types);

const open = require('open');
const hubspot = require('@hubspot/api-client')
const hubspotClient = new hubspot.Client({ apiKey: "03890cb8-9c41-4b45-9cb8-28a722e9cba0" })
const clientId = '9f78b231-c668-440a-ad50-d25e50825a43'
const clientSecret= '8a84d02e-1bdd-498e-bc9c-99aa9ccce8ab'
const redirectUri = 'http://localhost:3000/oauth-callback'

const scope = 'social oauth hubdb tickets e-commerce crm.lists.read crm.objects.contacts.read crm.objects.contacts.write crm.objects.custom.read crm.objects.custom.write crm.objects.companies.write crm.schemas.contacts.read media_bridge.read media_bridge.write crm.lists.write crm.objects.companies.read crm.objects.deals.read crm.objects.deals.write crm.schemas.companies.read crm.schemas.companies.write crm.schemas.contacts.write crm.schemas.deals.read crm.schemas.deals.write crm.objects.owners.read';
const uri = hubspotClient.oauth.getAuthorizationUrl(clientId, redirectUri, scope)
open(uri);
console.log("Url hubspot " +  uri);

var app = Express();
app.use('*', cors());
app.use(compression());
app.use(
  '/api',
  ExpressGraphQL({
    schema: schema,
    rootValue: genericResolver,
    graphiql: true,
  }),
);
app.get('/oauth-callback' ,  ( { query: {code} }, res ) =>{
  console.log("ESTA EN EL CALLBACKKK");
  console.log(code);
  return hubspotClient.oauth.tokensApi.createToken(
    'authorization_code',
    code, 
    redirectUri,
    clientId,
    clientSecret,
).then(res => {
  console.log("response from Create token");
  console.log(res);
  call();
})

} );

async function  call (){
  const allContacts = await hubspotClient.crm.deals.getAll()
  console.log("VAMOS A OBTENER TODOS LOS CONTACTOS");
  console.log(allContacts);
}

const db = require('./models');
db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and re-sync db.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});


