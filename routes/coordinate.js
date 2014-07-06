 db = require('../models')
exports.read = function(req, res) {
    db.coordinate.findAll().success(function(coordinate) {
        if (!coordinate.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(coordinate));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.coordinate.create(
             
{ latitude: req.body.latitude },
{ longitude: req.body.longitude },
{ speed: req.body.speed },
{ altitude: req.body.altitude },
{ address: req.body.address })            .success(function(coordinate) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(coordinate);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.coordinate.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.coordinate.update(
                 {
 latitude: req.body.latitude ,
 longitude: req.body.longitude ,
 speed: req.body.speed ,
 altitude: req.body.altitude ,
 address: req.body.address },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.coordinate.findAll().success(function(coordinate) {
if (!coordinate.length) res.writeHead(404);
  else {
  res.render('index' ,{ coordinate : coordinate }) 
 ; 
 } 
 res.end(); 
}) 
}