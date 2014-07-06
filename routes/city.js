 db = require('../models')
exports.read = function(req, res) {
    db.city.findAll().success(function(city) {
        if (!city.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(city));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.city.create(
             
{ name: req.body.name },
{ country_id: req.body.country_id })            .success(function(city) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(city);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.city.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.city.update(
                 {
 name: req.body.name ,
 country_id: req.body.country_id },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.city.findAll().success(function(city) {
if (!city.length) res.writeHead(404);
  else {
  res.render('index' ,{ city : city }) 
 ; 
 } 
 res.end(); 
}) 
}