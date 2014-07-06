 db = require('../models')
exports.read = function(req, res) {
    db.users_has_credentials.findAll().success(function(users_has_credentials) {
        if (!users_has_credentials.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(users_has_credentials));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.users_has_credentials.create(
             
{ users_id: req.body.users_id },
{ credentials_id: req.body.credentials_id })            .success(function(users_has_credentials) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(users_has_credentials);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.users_has_credentials.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.users_has_credentials.update(
                 {
 users_id: req.body.users_id ,
 credentials_id: req.body.credentials_id },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.users_has_credentials.findAll().success(function(users_has_credentials) {
if (!users_has_credentials.length) res.writeHead(404);
  else {
  res.render('index' ,{ users_has_credentials : users_has_credentials }) 
 ; 
 } 
 res.end(); 
}) 
}