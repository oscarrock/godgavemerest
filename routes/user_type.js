db = require('../models')
exports.read = function(req, res) {
    db.user_type.findAll().success(function(user_type) {
        if (!user_type.length)
            res.writeHead(404);
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(user_type));
        }
        res.end();
    }).error(function(err) {
        res.send(404, err)
        res.end();
    })
}

exports.create = function(req, res) {
    db.user_type.create(
            {name: req.body.name},
    {description: req.body.description}).success(function(user_type) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(user_type);
        res.end();
    })
            .error(function(err) {
                res.send(404, err)
                res.end();
            })
}

exports.delete = function(req, res) {
    db.user_type.destroy({id: req.params.id})
            .success(function() {
                res.send(200);
                res.end();
            }).error(function(err) {
        res.send(404, err)
        res.end();
    })
}

exports.update = function(req, res) {
    db.user_type.update(
            {
                name: req.body.name,
                description: req.body.description}, {id: req.params.id})
            .success(function() {
                res.send(200);
                res.end();
            }).error(function(err) {
        res.send(404, err)
        res.end();
    })
}

exports.render = function(req, res) {
    db.user_type.findAll().success(function(user_type) {
        if (!user_type.length)
            res.writeHead(404);
        else {
            res.render('index', {user_type: user_type})
                    ;
        }
        res.end();
    })
}