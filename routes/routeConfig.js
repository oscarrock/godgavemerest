  app = require('../app'), routes = require('./index.js');
  
 app.get('/api/city',routes.city.read) 
app.post('/api/city/',routes.city.create) 
app.delete('/api/city/:id',routes.city.delete) 
app.put('/api/city/:id',routes.city.update) 
app.get('/city', routes.city.render); 

 app.get('/api/coordinate',routes.coordinate.read) 
app.post('/api/coordinate/',routes.coordinate.create) 
app.delete('/api/coordinate/:id',routes.coordinate.delete) 
app.put('/api/coordinate/:id',routes.coordinate.update) 
app.get('/coordinate', routes.coordinate.render); 

 app.get('/api/country',routes.country.read) 
app.post('/api/country/',routes.country.create) 
app.delete('/api/country/:id',routes.country.delete) 
app.put('/api/country/:id',routes.country.update) 
app.get('/country', routes.country.render); 

 app.get('/api/credentials',routes.credentials.read) 
app.post('/api/credentials/',routes.credentials.create) 
app.delete('/api/credentials/:id',routes.credentials.delete) 
app.put('/api/credentials/:id',routes.credentials.update) 
app.get('/credentials', routes.credentials.render); 

 app.get('/api/service',routes.service.read) 
app.post('/api/service/',routes.service.create) 
app.delete('/api/service/:id',routes.service.delete) 
app.put('/api/service/:id',routes.service.update) 
app.get('/service', routes.service.render); 

 app.get('/api/user_address',routes.user_address.read) 
app.post('/api/user_address/',routes.user_address.create) 
app.delete('/api/user_address/:id',routes.user_address.delete) 
app.put('/api/user_address/:id',routes.user_address.update) 
app.get('/user_address', routes.user_address.render); 

 app.get('/api/user_type',routes.user_type.read) 
app.post('/api/user_type/',routes.user_type.create) 
app.delete('/api/user_type/:id',routes.user_type.delete) 
app.put('/api/user_type/:id',routes.user_type.update) 
app.get('/user_type', routes.user_type.render); 

 app.get('/api/users',routes.users.read) 
app.post('/api/users/',routes.users.create) 
app.delete('/api/users/:id',routes.users.delete) 
app.put('/api/users/:id',routes.users.update) 
app.get('/users', routes.users.render); 

 app.get('/api/users_has_address',routes.users_has_address.read) 
app.post('/api/users_has_address/',routes.users_has_address.create) 
app.delete('/api/users_has_address/:id',routes.users_has_address.delete) 
app.put('/api/users_has_address/:id',routes.users_has_address.update) 
app.get('/users_has_address', routes.users_has_address.render); 

 app.get('/api/users_has_credentials',routes.users_has_credentials.read) 
app.post('/api/users_has_credentials/',routes.users_has_credentials.create) 
app.delete('/api/users_has_credentials/:id',routes.users_has_credentials.delete) 
app.put('/api/users_has_credentials/:id',routes.users_has_credentials.update) 
app.get('/users_has_credentials', routes.users_has_credentials.render); 
