const ServiceType = require('../models/serviceType');

module.exports.get = function(req, res) {
    ServiceType.find()
        .exec()
        .then(docs => {
            res.json(docs);
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
        if (err) return res.status(404).send(err);
        res.status(204).json();
    });
};

module.exports.update = function(req, res) {
    const id = req.params.id;
    ServiceType.updateOne({ _id: id }, req.body, function(err, doc) {
        if (err) return res.status(404).send(err);
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
                res.send(docs);
            })
            .catch(err => {
                res.status(500).json(err.message);
                console.log(err.message);
            });
    });
};
