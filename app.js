//author: Oscar Rico
//date: 04/07/2014
//Rev 1
var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , db      = require('./models')
  , cors = require('cors')
  
var bodyParser = require('body-parser')
var app = module.exports = express(); 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())      
app.use(cors());
var routes = require('./routes/routeConfig');

app.set('port', process.env.PORT || 3000)

db
  .sequelize
  .sync({ force: false })
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
