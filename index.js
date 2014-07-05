//author: Oscar Rico
//date: 04/07/2014
//Rev 1

module.exports = {
    /**
     * Connect to database query schema and create all files needed to 
     * get a working rest api at your localhost/api/tablename
     * This function creates an http restful service with all crud 
     * operations like create, read, delete, update.
     * 
     * @param {type} config
     * @returns { created files and folder structure}
     */
    error_occurred : false,
    run: function(config) {
        
            var mysql = require('mysql');
            var util = require('util');
            var fs = require('fs');
            var mkdirp = require('mkdirp');
            var getDirName = require('path').dirname;
            //var async = require('async');
            var ncp = require('ncp');
       
            if(config === null)
            {
              config = { 
                    //Setup your Database Connection
                   database: 'mydb', 
                    user: 'myuser', 
                    password: 'myPwd111',
                    host: 'yourhost.com',
                    dbPort: 3306,
                    dialect: 'mysql',
                    schema: 'myschema',
                    modelsPath : './models/',
                    routesPath : './routes/',
                    serverPath: './', //Root of dir
                    configPath: './config/',
                    templatePath: './lib/templates',
                    appPath : './lib/app.js',
                    mindexPath: './lib/mIndex.js',
                  };
            }
            
           // module.exports = config;
           
             var templates = require(config.templatePath);
           
            var connection = mysql.createConnection(
                    {
                        host: config.host,
                        user: config.user,
                        password: config.password,
                        database: config.database
                    }
            );

            var PRIMARY_KEY = 'PRI';
            var FOREIGN_KEY = 'MUL';

            connection.connect();
            
            mkdirp(config.modelsPath, function(err) {
                showError(err);
            });
            mkdirp(config.routesPath, function(err) {
                showError(err);
            });
             mkdirp(config.configPath, function(err) {
                showError(err);
            });
            
            copyFiles(config.appPath, config.serverPath + 'app.js');
            copyFiles(config.mindexPath,  config.modelsPath + 'index.js');
            writeFile(JSON.stringify(config, null, 4) ,config.configPath, 'config.json');
            
            beginMapping();
      
    /////////////////////////////////////////BEGIN MAPPING FUNCTIONS
    
    function beginMapping()
    {
        //console.log('begginMapping...' + templates.tablesQuery);
        templates.tablesQuery = util.format( templates.tablesQuery , config.schema);
        connection.query(templates.tablesQuery, function(err, rows, fields) {
            if (err)
                return showError(err);
            var routesOutput = '';
            var routeIndex = '';
            for (var i in rows) {
                var tablename = rows[i].TABLE_NAME;
                routesOutput += "\n " + util.format(templates.routeTemplateOutput, tablename, tablename,
                        tablename, tablename, tablename, tablename, tablename, tablename, tablename, tablename);
                routeIndex += util.format("\nexports.%s = require('./%s.js')", tablename, tablename);
                
                var query = util.format(templates.columnsQuery, tablename);
                createEntity(query, tablename);
            }
            writeFile(templates.routeTemplateHeader + routesOutput, config.routesPath, 'routeConfig.js');
            console.log('check /routeConfig.js to check generated routes');
            writeFile(routeIndex, config.routesPath, 'index.js');
        });
    }
    
    
    function copyFiles(source, destination)
    {
          
        ncp(source, destination, function (err) {
        if (err) {
          return showError(err);
        }
        console.log('copy success! ' + destination);
       });
    }
    
    function showError(err)
    {
        error_occurred = true;
        console.log('error: ' + err);
        return false;
    }

    function createEntity(query, table)
    {
        console.log('createEntity: ' + table);
        var entityCreated;
        var routeCreateParams = '';
        var routeUpdateParams = '';
        connection.query(query, function(err, rows, fields) {
            entityCreated = '';
            if (err)
                return showError(err);
            for (var i in rows) {
                var type = rows[i].Type;
                var field = rows[i].Field;
                var key = rows[i].Key;
                entityCreated += formatRowFieldWithType(type, field);
                if (routeCreateParams !== '')
                    routeCreateParams += ',' + util.format("\n{ %s: req.param('%s') }", field, field);
                else
                    routeCreateParams += util.format("{ %s: req.param('%s') }", field, field);

                if (routeUpdateParams !== '')
                    routeUpdateParams += ',' + util.format("\n%s: req.param('%s')", field, field);
                else
                    routeUpdateParams += util.format("%s: req.param('%s') ", field, field);

            }
            addRelationships(table, entityCreated, routeCreateParams, routeUpdateParams);

        });
    }

    function addRelationships(table, entityCreated, routeCreateParams, routeUpdateParams)
    {
        var relationships = '';
        query = util.format(templates.constraintsQuery,config.schema, table, table);
        connection.query(query, function(err, rows, fields) {
            for (var i in rows)
            {
                var referenced_table = rows[i].REFERENCED_TABLE_NAME;
                if (referenced_table === table)
                {
                    relationships += util.format("\n %s.hasMany(models.%s); ", table, rows[i].TABLE_NAME);
                } else {
                    relationships += util.format("\n %s.hasOne(models.%s); ", table, rows[i].REFERENCED_TABLE_NAME);
                }
            }
            var content = util.format(templates.entityTemplate, table, table, entityCreated, table, relationships, table);
            var filename = table + ".js";

            var routeRead = util.format(templates.readTemplate, table, table, table, table);
            var routeCreate = util.format(templates.createTemplate, table, routeCreateParams);
            var routeDelete = util.format(templates.deleteTemplate, table);
            var routeUpdate = util.format(templates.updateTemplate, table, routeUpdateParams);
            var render = util.format(templates.renderTemplate, table, table, table, table, table);

            var allRoutes = routeRead + "\n\n" + routeCreate + "\n\n" + routeDelete + "\n\n" + routeUpdate + '\n\n' + render;

            writeFile(content, config.modelsPath, filename);
            writeFile(allRoutes, config.routesPath, filename);


        });
    }

    //Write a file to disk given content and path
    function writeFile(content, path, filename)
    {
        mkdirp(path, function(err) {
            if (err)
                return showError(err)
            fs.writeFile(path + filename, content, function(err) {
                if (err) {
                    showError(err);
                } else {
                    console.log("fileSaved: " + filename);
                }
            });
        });
    }

    function formatRowFieldWithType(type, field, key)
    {
        var rowFormated = '';
        if (key == PRIMARY_KEY || key == FOREIGN_KEY)
        {
            //console.log('Key:' + rows[i].Field);
        } else
        {
            if (type.indexOf('(') > -1) {
                type = type.substring(0, type.indexOf('('));
            }
            switch (type)
            {
                case 'int':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'INTEGER');
                    break;
                case 'tinyint':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'INTEGER');
                    break;
                case 'smallint':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'INTEGER');
                    break;
                case 'mediumint':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'INTEGER');
                    break;
                case 'bigint':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'BIGINT');
                    break;
                case 'float':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'FLOAT');
                    break;
                case 'double':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'FLOAT');
                    break;
                case 'decimal':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'DECIMAL');
                    break;
                case 'date', 'datetime', 'timestamp':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'DATE');
                    break;
                case 'year'://Im not shure how sequelize handle this type
                    //fields = util.format( '%s \n %s: Sequelize.%s',fields, field ,'DATE'); 
                    break;
                case 'char', 'varchar':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'STRING');
                    break;
                case 'text', 'tinytext', 'longtext':
                    rowFormated = util.format('%s  \n %s: DataTypes.%s', rowFormated, field, 'TEXT');
                    break;
                case 'blob', 'tinyblob', 'longblob':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'BLOB');
                    break;
                case 'enum':
                    rowFormated = util.format('%s \n %s: DataTypes.%s', rowFormated, field, 'ENUM');
                    break;
            }//Close Case
            if (rowFormated !== '')
                rowFormated += ",";
        }//Close else FK
        return rowFormated;
    }

}

};
