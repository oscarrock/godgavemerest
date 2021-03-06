#godgavemerest
==============

(Rest Server Generator using Express and Sequelize)

I have build a small node script to generate all files and folders to get up a 
rest server running with cero configuration. If you are lazy like me and don't 
have time to waste writing entity classes let this script save you some time. 
The entity framework used to make this project is sequelize. You can see project
dependencis in package.json.

After you set up your mysql database configuration you will have your crud rest 
server to use it like this:

```GET http://yourdomain/api/users```

```GET http://yourdomain/api/users/1```

The script generates the following files:
    
    /models/index.js
    /models/entity..1
    /models/entity..n

    /routes/index.js
    /routes/routeConfig.js
    /routes/entityroute..1
    /routes/entityroute..n

    /config/config.json
    
    /app.js

Warning: it will not propmt to overwrite, so backup your files or first run.

##DISCLAMER

I won't give any support or guarantie. So check your files, test them. I did this
with any money or support.

##USAGE

Create empty folder, inith your node js application and install required modules.

```
npm init
npm install godgavemerest
npm install express
npm install sequelize
npm install lodash 
npm install mysql
npm install cors
npm install body-parser
```

Create a build.js at your root folder.
```
(function (){
var godgavemerest = require('godgavemerest')
config = { 
  //Setup your Database Connection
  database: 'mydb', 
  user: 'myuser', 
  password: 'myPwd111',
  host: 'yourhost.com',
  schema: 'yourschema',
  dbPort: 3306,
  dialect: 'mysql',
  //Do not change this  ////////
  modelsPath : './models/',
  routesPath : './routes/',
  serverPath : './', 
  configPath  : './config/',
  //Library containing string templates
  templatePath: './lib/templates',
  //Files to be copied
  appPath : './node_modules/godgavemerest/lib/app.js',
  mindexPath: './node_modules/godgavemerest/lib/mindex.js'
 /////////////////////////////////
};
godgavemerest.run(config);

}).call(this)
```

Execute your script build.js to generate all files.
```node build```

After script create all files you can press control +c

Then you will like to run your server with:

```node app ```

That's it. You will have a very basic rest service running. (I hope).
Go to your browser  http://localhost:3000/api/your_table

Done!.

This is my first node script so be patient, if there is someone wants to help,
solve bugs etc.. you are welcome.

##Credits

godgavemerest was created by [Oscar J. Rico] [http://gone] 

Please contribute by [reporting bugs](https://github.com/oscarrock/godgavemerest/issues) and 
submitting [pull requests](https://github.com/oscarrock/godgavemerest/pulls).

##License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, 
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

