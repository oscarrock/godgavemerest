 db = require('../models')
exports.read = function(req, res) {
    db.service.findAll().success(function(service) {
        if (!service.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(service));
        }
        res.end();
    }).error(function(err){
         res.send(404, err)
         res.end();
    })
}

exports.create = function(req, res) {
    db.service.create(
             
{ date: req.body.date },
{ end: req.body.end },
{ deliver_address: req.body.deliver_address },
{ deliver_instructions: req.body.deliver_instructions },
{ price: req.body.price },
{ deliver: req.body.deliver },
{ messenger_id: req.body.messenger_id },
{ arrival_time: req.body.arrival_time },
{ is_money: req.body.is_money },
{ money: req.body.money },
{ user_address_id: req.body.user_address_id })            .success(function(service) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(service);
                res.end();
             })
            .error(function(err) {
                res.send(404, err)
                res.end();
    })
}

exports.delete = function(req, res){
        db.service.destroy({id: req.params.id})
        .success(function() {
            res.send(200);
            res.end();
        }).error(function(err) {
            res.send(404, err)
            res.end();
         })
}

exports.update = function(req, res) {
        db.service.update(
                 {
 date: req.body.date ,
 end: req.body.end ,
 deliver_address: req.body.deliver_address ,
 deliver_instructions: req.body.deliver_instructions ,
 price: req.body.price ,
 deliver: req.body.deliver ,
 messenger_id: req.body.messenger_id ,
 arrival_time: req.body.arrival_time ,
 is_money: req.body.is_money ,
 money: req.body.money ,
 user_address_id: req.body.user_address_id },{id : req.params.id }         )
            .success(function() {
                res.send(200);
                res.end();
             }).error(function(err) {
                res.send(404, err)
                res.end();
         })
}

exports.render = function(req, res){
 db.service.findAll().success(function(service) {
if (!service.length) res.writeHead(404);
  else {
  res.render('index' ,{ service : service }) 
 ; 
 } 
 res.end(); 
}) 
}