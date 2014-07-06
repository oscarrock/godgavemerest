 db = require('../models')
exports.read = function(req, res) {
    db.country.findAll().success(function(country) {
        if (!country.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(country));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.country.create(
             
{ name: req.body.name })            .success(function(country) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(country);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.country.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.country.update(
                 {
 name: req.body.name },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.country.findAll().success(function(country) {
if (!country.length) res.writeHead(404);
  else {
  res.render('index' ,{ country : country }) 
 ; 
 } 
 res.end(); 
}) 
}