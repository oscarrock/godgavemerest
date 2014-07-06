 db = require('../models')
exports.read = function(req, res) {
    db.credentials.findAll().success(function(credentials) {
        if (!credentials.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(credentials));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.credentials.create(
             
{ provider: req.body.provider },
{ token: req.body.token },
{ uid: req.body.uid },
{ key: req.body.key },
{ timestamp: req.body.timestamp })            .success(function(credentials) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(credentials);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.credentials.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.credentials.update(
                 {
 provider: req.body.provider ,
 token: req.body.token ,
 uid: req.body.uid ,
 key: req.body.key ,
 timestamp: req.body.timestamp },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.credentials.findAll().success(function(credentials) {
if (!credentials.length) res.writeHead(404);
  else {
  res.render('index' ,{ credentials : credentials }) 
 ; 
 } 
 res.end(); 
}) 
}