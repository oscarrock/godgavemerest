 db = require('../models')
exports.read = function(req, res) {
    db.user_address.findAll().success(function(user_address) {
        if (!user_address.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(user_address));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.user_address.create(
             
{ address: req.body.address },
{ city_id: req.body.city_id },
{ coordinate_id: req.body.coordinate_id })            .success(function(user_address) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(user_address);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.user_address.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.user_address.update(
                 {
 address: req.body.address ,
 city_id: req.body.city_id ,
 coordinate_id: req.body.coordinate_id },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.user_address.findAll().success(function(user_address) {
if (!user_address.length) res.writeHead(404);
  else {
  res.render('index' ,{ user_address : user_address }) 
 ; 
 } 
 res.end(); 
}) 
}