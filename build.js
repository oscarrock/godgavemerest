(function (){
var godgavemerest = require('./index')
config = { 
  //Setup your Database Connection
  database: 'mydb', 
  user: 'myuser', 
  password: 'myPwd111',
  host: 'yourhost.com',
  dbPort: 3306,
  dialect: 'mysql',
  schema: 'domidb',
  modelsPath : './models/',
  routesPath : './routes/',
  serverPath: './', //Root of dir
  confiPath: './config/',
  templatePath: './lib/templates',
  appPath : './lib/app',
  modelIndexPath: './lib/modeIndex',
};
godgavemerest.run(config);

}).call(this)