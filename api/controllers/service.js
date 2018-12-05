const Service = require('../models/service');
const mongoose = require('mongoose');

module.exports.get = function(req, res) {
    Service.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.render('services', {
                services: docs
            });
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

module.exports.delete = function(req, res) {
    const id = req.params.id;
    Service.deleteOne({ _id: id }, function(err) {
        if (err) return handleError(err);
        // deleted at most one tank document
        Service.find()
            .exec()
            .then(docs => {
                res.render('services', {
                    services: docs
                });
            })
            .catch(err => {
                res.status(500).json(err.message);
                console.log(err.message);
            });
    });
};

module.exports.delete = function(req, res) {
    const id = req.params.id;
    Service.deleteOne({ _id: id }, function(err) {
        if (err) return handleError(err);
        // deleted at most one tank document
    });
};

module.exports.update = function(req, res) {
    const id = req.params.id;
    Service.updateOne({ _id: id }, req.body, function(err, doc) {
        if (err) return handleError(err);
        // deleted at most one tank document
        res.send(doc);
    });
};

module.exports.getForm = function(req, res) {
    res.render('serviceForm');
};

module.exports.addNew = function(req, res) {
    const service = new Service(req.body);
    service.save(function(err) {
        if (err) {
            res.render('serviceForm');
        }
        res.render('serviceForm');
    });
};
