 db = require('../models')
exports.read = function(req, res) {
    db.users_has_address.findAll().success(function(users_has_address) {
        if (!users_has_address.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(users_has_address));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.users_has_address.create(
             
{ user_address_id: req.body.user_address_id },
{ users_id: req.body.users_id })            .success(function(users_has_address) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(users_has_address);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.users_has_address.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.users_has_address.update(
                 {
 user_address_id: req.body.user_address_id ,
 users_id: req.body.users_id },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.users_has_address.findAll().success(function(users_has_address) {
if (!users_has_address.length) res.writeHead(404);
  else {
  res.render('index' ,{ users_has_address : users_has_address }) 
 ; 
 } 
 res.end(); 
}) 
}