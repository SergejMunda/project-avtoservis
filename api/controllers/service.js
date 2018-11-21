const Service = require('../models/service');
const mongoose = require('mongoose');

module.exports.get = function (req, res) {
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
};

module.exports.getForm = function (req, res) {
    res.render('serviceForm');
};

module.exports.addNew = function (req, res) {
    const service = new Service(req.body);
    service.save(function (err) {
        if (err) {
            res.render('serviceForm');
        }
        res.render('serviceForm');
    });

};