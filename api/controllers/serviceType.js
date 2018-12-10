const ServiceType = require('../models/serviceType');

module.exports.get = function(req, res) {
    ServiceType.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.render('serviceType', { items: docs });
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

module.exports.getOne = function(req, res) {
    const id = req.params.id;
    ServiceType.findOne({ _id: id })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc !== null) {
                res.send(doc);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

module.exports.delete = function(req, res) {
    const id = req.params.id;
    ServiceType.deleteOne({ _id: id }, function(err) {
        if (err) return handleError(err);
        res.sendStatus(200);
    });
};

module.exports.update = function(req, res) {
    const id = req.params.id;
    ServiceType.updateOne({ _id: id }, req.body, function(err, doc) {
        if (err) return handleError(err);
        res.send(doc);
    });
};

module.exports.add = function(req, res) {
    const serviceType = new ServiceType(req.body);
    serviceType.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        ServiceType.find()
            .exec()
            .then(docs => {
                console.log(docs);
                res.render('serviceType', { items: docs });
            })
            .catch(err => {
                res.status(500).json(err.message);
                console.log(err.message);
            });
    });
};
