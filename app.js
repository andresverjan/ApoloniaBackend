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

const developerApiKey = '9d2d376d-abb2-472f-9271-9d65fa9eeec1';
const hubspotClient = new hubspot.Client({ apiKey: developerApiKey })
const clientId = 'f066f238-b872-497a-907a-769f1f3404fd'
const clientSecret= '3815edb2-4fc3-4c5c-9483-1ea81a1e14d7'
const redirectUri = 'http://localhost:3000/oauth-callback'

const scope = "tickets crm.lists.read crm.objects.contacts.read crm.objects.custom.read crm.objects.custom.write crm.schemas.contacts.read crm.objects.deals.read";


const uri = hubspotClient.oauth.getAuthorizationUrl(clientId, redirectUri, scope)
open(uri);
console.log("Url hubspot " +  uri);

var app = Express();
app.use('*', cors());
app.use(compression());

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

//Commented for POC_API.
/*app.use(
  '/api',
  ExpressGraphQL({
    schema: schema,
    rootValue: genericResolver,
    graphiql: true,
  }),
);*/

//Commented for POC_API.
/*const db = require('./models');
db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and re-sync db.');
});*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});


