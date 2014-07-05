(function (){
var godgavemerest = require('./index')
config = { 
  //Setup your Database Connection
  database: 'domidb', 
  user: 'domidb', 
  password: 'Domidb123!',
  host: 'domidb.db.8800187.hostedresource.com',
  dbPort: 3306,
  dialect: 'mysql',
  schema: 'domidb',
  //Do not change this directories
  modelsPath : './models/',
  routesPath : './routes/',
  serverPath : './', 
  configPath  : './config/',
  //Library containing string templates
  templatePath: './lib/templates',
 //Files to be copied
  appPath : './lib/app.js',
  mindexPath: './lib/mindex.js'
};
godgavemerest.run(config);

}).call(this)

//(function (){
//var godgavemerest = require('godgavemerest')
//config = { 
//  //Setup your Database Connection
//  database: 'domidb', 
//  user: 'domidb', 
//  password: 'Domidb123!',
//  host: 'domidb.db.8800187.hostedresource.com',
//  dbPort: 3306,
//  dialect: 'mysql',
//  schema: 'domidb',
//  //Do not change this directories
//  modelsPath : './models/',
//  routesPath : './routes/',
//  serverPath : './', 
//  configPath  : './config/',
//  //Library containing string templates
//  templatePath: './lib/templates',
// //Files to be copied
//  appPath : './node_modules/godgavemerest/lib/app.js',
//  mindexPath: './node_modules/godgavemerest/lib/mindex.js'
//};
//godgavemerest.run(config);
//
//}).call(this)
//

