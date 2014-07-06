 db = require('../models')
exports.read = function(req, res) {
    db.users.findAll().success(function(users) {
        if (!users.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(users));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.users.create(
             
{ firstname: req.body.firstname },
{ lastname: req.body.lastname },
{ doc_id: req.body.doc_id },
{ username: req.body.username },
{ password: req.body.password },
{ active: req.body.active },
{ user_type_id: req.body.user_type_id },
{ phone: req.body.phone })            .success(function(users) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(users);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.users.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.users.update(
                 {
 firstname: req.body.firstname ,
 lastname: req.body.lastname ,
 doc_id: req.body.doc_id ,
 username: req.body.username ,
 password: req.body.password ,
 active: req.body.active ,
 user_type_id: req.body.user_type_id ,
 phone: req.body.phone },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.users.findAll().success(function(users) {
if (!users.length) res.writeHead(404);
  else {
  res.render('index' ,{ users : users }) 
 ; 
 } 
 res.end(); 
}) 
}