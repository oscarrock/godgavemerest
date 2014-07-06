//author: Oscar Rico
//date: 04/07/2014
//Rev 1

module.exports = { 
//Mapping query Templates
 entityTemplate : "module.exports = function(sequelize, DataTypes) { \n" +
        " %s = sequelize.define(\n '%s' \n,{ \n %s \n}, \n{ tableName: '%s',timestamps: false, \n" +
        "\n associate: function(models){%s}} )\n return %s \n}",
 constraintsQuery : "select CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME,REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME" +
        " from information_schema.key_column_usage" +
        " where constraint_schema = '%s' " +
        " AND CONSTRAINT_NAME <> 'PRIMARY' AND TABLE_NAME = '%s' or REFERENCED_TABLE_NAME ='%s' ",
 columnsQuery : "SHOW COLUMNS FROM %s",
 tablesQuery : "SELECT * FROM INFORMATION_SCHEMA.TABLES where TABLE_SCHEMA = '%s'",
//Routing templates for crud operations
 readTemplate : " db = require('../models')\n"+
"exports.read = function(req, res) {\n"+
"    db.%s.findAll().success(function(%s) {\n"+
"        if (!%s.length)\n"+
"            res.writeHead(404);\n"+
"        else {\n"+
"            res.writeHead(200, {'Content-Type': 'application/json'});\n"+
"            res.write(JSON.stringify(%s));\n"+
"        }\n"+
"        res.end();\n"+
"    }).error(function(err){\n"+
"         res.send(404, err)\n"+
"         res.end();\n"+
"    })\n}",
 createTemplate : "exports.create = function(req, res) {\n"+
"    db.%s.create(\n"+
"             %s)"+
"            .success(function(%s) {\n"+
"                res.writeHead(200, {'Content-Type': 'application/json'});\n"+
"                res.write(%s);\n"+
"                res.end();\n"+
"             })\n"+
"            .error(function(err) {\n"+
"                res.send(404, err)\n"+
"                res.end();\n"+ 
"    })\n}", 
 updateTemplate : "exports.update = function(req, res) {\n"+
"        db.%s.update(\n"+
"                 {%s},{id : req.params.id }"+
"         )\n"+
"            .success(function() {\n"+
"                res.send(200);\n"+
"                res.end();\n"+
"             }).error(function(err) {\n"+
"                res.send(404, err)\n"+
"                res.end();\n"+
"         })\n}",
 deleteTemplate : "exports.delete = function(req, res){\n"+
"        db.%s.destroy({id: req.params.id})\n"+
"        .success(function() {\n"+
"            res.send(200);\n"+
"            res.end();\n"+
"        }).error(function(err) {\n"+
"            res.send(404, err)\n"+
"            res.end();\n"+
"         })\n}",
renderTemplate : "exports.render = function(req, res){\n " +
        "db.%s.findAll().success(function(%s) {\n" +
        "if (!%s.length) res.writeHead(404);\n " +
        " else {\n  res.render('index' ,{ %s : %s })" +
        " \n ; \n } \n res.end(); \n}) \n}",

 routeTemplateHeader : "  app = require('../app'), routes = require('./index.js');\n  ",
 routeTemplateOutput : "app.get('/api/%s',routes.%s.read) \n" +
        "app.post('/api/%s/',routes.%s.create) \n" +
        "app.delete('/api/%s/:id',routes.%s.delete) \n" +
        "app.put('/api/%s/:id',routes.%s.update) \n" +
        "app.get('/%s', routes.%s.render); \n",
routeBodyParamString: "\n{ %s: req.body.%s }",
routeParamString :"\n{ %s: req.params.%s }"
};

