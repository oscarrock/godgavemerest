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
    error_occurred: false,
    run: function(config) {

        var mysql = require('mysql');
        var util = require('util');
        var fs = require('fs');
        var mkdirp = require('mkdirp');
        var getDirName = require('path').dirname;
        //var async = require('async');
        var ncp = require('ncp');

//            if(config === null) //This is for personal debugging.
//            {
//              config = { 
//                    //Setup your Database Connection
//                   database: 'mydb', 
//                    user: 'myuser', 
//                    password: 'myPwd111',
//                    host: 'yourhost.com',
//                    dbPort: 3306,
//                    dialect: 'mysql',
//                    schema: 'myschema',
//                    modelsPath : './models/',
//                    routesPath : './routes/',
//                    serverPath: './', //Root of dir
//                    configPath: './config/',
//                    templatePath: './lib/templates',
//                    appPath : './lib/app.js',
//                    mindexPath: './lib/mIndex.js',
//                  };
//            }

        module.exports = config;

        var templates = require(config.templatePath);

        var connection = mysql.createConnection(
                {
                    host: config.host,
                    user: config.user,
                    password: config.password,
                    database: config.database
                }
        );


        var mysql_const =
                {
                    PRIMARY_KEY: 'PRI',
                    FOREIGN_KEY: 'MUL',
                    PK_AUTOINCREMENT: 'auto_increment',
                    DONT_ALLOW_NULL : 'NO'
                }


        connection.connect();

        mkdirp(config.modelsPath, function(err) {
            if (err)
                showError(err);
            else
                console.log(config.modelsPath + ' created...')
        });
        mkdirp(config.routesPath, function(err) {
            if (err)
                showError(err);
            else
                console.log(config.routesPath + ' created...')
        });
        mkdirp(config.configPath, function(err) {
            if (err)
                showError(err);
            else
                console.log(config.configPath + ' created...')
        });

        copyFiles(config.appPath, config.serverPath + 'app.js');
        copyFiles(config.mindexPath, config.modelsPath + 'index.js');
        writeFile(JSON.stringify(config, null, 4), config.configPath, 'config.json');

        beginMapping();

        /////////////////////////////////////////BEGIN MAPPING FUNCTIONS

        function beginMapping()
        {
            templates.tablesQuery = util.format(templates.tablesQuery, config.schema);
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
                writeFile(routeIndex, config.routesPath, 'index.js');
            });
        }


        function copyFiles(source, destination)
        {

            ncp(source, destination, function(err) {
                if (err) {
                    return showError(err);
                }
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
                    var allowNull = rows[i].Null;
                    var defaultValue = rows[i].Default;
                    var extra = rows[i].Extra; //Autoincrement

                    entityCreated += formatRowFieldWithType(type, field, key, allowNull, defaultValue, extra);
                    ////Generating fields for routes crud ops///////
                    if (key === mysql_const.PRIMARY_KEY && extra === mysql_const.PK_AUTOINCREMENT)
                    {
                        //We dont like to add our pk on these crud ops.
                    } else {
                        if (routeCreateParams !== '')
                            routeCreateParams += ',' + util.format("\n{ %s: req.body.%s }", field, field);
                        else
                            routeCreateParams += util.format("\n{ %s: req.body.%s }", field, field);
                        
                        if (routeUpdateParams !== '')
                            routeUpdateParams += ',' + util.format("\n %s: req.body.%s ", field, field);
                        else
                            routeUpdateParams += util.format("\n %s: req.body.%s ", field, field);
                    }
                    ///////////////////////////////////////////////
                }
                addRelationships(table, entityCreated, routeCreateParams, routeUpdateParams);

            });
        }

        function addRelationships(table, entityCreated, routeCreateParams, routeUpdateParams)
        {
            var relationships = '';
            query = util.format(templates.constraintsQuery, config.schema, table, table);
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
                var routeCreate = util.format(templates.createTemplate, table, routeCreateParams,table,table);
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
                        console.log("Created: " + path + filename);
                    }
                });
            });
        }

        function formatRowFieldWithType(type, field, key, allownull, defaultValue, extra)
        {
            console.log( util.format("%s , %s , %s ,%s , %s ,%s ",type, field, key, allownull, defaultValue, extra));
            if (type.indexOf('(') > -1)
                type = type.substring(0, type.indexOf('('));
            
            if(allownull === mysql_const.DONT_ALLOW_NULL)
                allownull = false;
            else
                allownull = true;
            
            var datatype = getDataType(type.trim());
            if (datatype) {
                if (key === mysql_const.PRIMARY_KEY || key === mysql_const.FOREIGN_KEY)
                {
                    if (extra == mysql_const.PK_AUTOINCREMENT && key == mysql_const.PRIMARY_KEY){
                        return util.format('\n %s: {type: DataTypes.%s, allowNull:%s, autoIncrement:%s, primaryKey: true} ',field, datatype, allownull, true) + ",";
                    }
                    else
                        return util.format('\n %s: {type: DataTypes.%s, allowNull:%s }',field, datatype, allownull) + ",";
                } else
                {
                    return  buildRow(field, datatype, allownull, defaultValue) + ",";
                }
            } else
            {
                console.log('Datatype not mapped....');
                return '';
            }
        }


        function buildRow(field, data_type, allowNull, defaultValue)
        {
            if(defaultValue)
                return util.format('\n   %s: {type:  DataTypes.%s, allowNull:%s, defaultValue:%s}', field, data_type, allowNull, defaultValue);
            else
                 return util.format('\n   %s: {type:  DataTypes.%s, allowNull:%s }', field, data_type,allowNull);
        }

        function getDataType(type)
        {
            var returnVal ='';
            switch (type)
            {
                case 'int': case 'tinyint': case 'smallint': case 'mediumint':
                    returnVal= 'INTEGER';
                    break;
                case 'bigint':
                    returnVal= 'BIGINT';
                    break;
                case 'float':
                    returnVal= 'FLOAT';
                    break;
                case 'double':
                    returnVal= 'FLOAT';
                    break;
                case 'bit':
                    returnVal= 'BOOLEAN';
                    break;
                case 'decimal':
                    returnVal= 'DECIMAL';
                    break;
                case 'date': case 'datetime': case 'timestamp':
                    returnVal= 'DATE';
                    break;
                case 'year'://Im not shure how sequelize handle this type
                    break;
                case 'char': case 'varchar':
                    returnVal= 'STRING';
                    break;
                case 'text': case 'tinytext': case 'longtext':
                    returnVal= 'TEXT';
                    break;
                case 'blob': case 'tinyblob': case 'longblob':
                    returnVal= 'BLOB';
                    break;
                case 'enum':
                    returnVal= 'ENUM';
                    break;
                default:
                    returnVal= null;
                    break;
            }//Close Case
            
            return returnVal;
        }

    }
};
