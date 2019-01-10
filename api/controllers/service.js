const Service = require('../models/service');
const ServiceType = require('../models/serviceType');

module.exports.get = function(req, res) {
    Service.find()
        .populate('type')
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
    Service.findOne({ _id: id })
        .populate('type')
        .exec()
        .then(doc => {
            if (doc !== null) {
                res.json(doc);
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
    Service.deleteOne({ _id: id }, function(err) {
        if (err) return handleError(err);
        res.sendStatus(204);
    });
};

module.exports.update = function(req, res) {
    const id = req.params.id;
    Service.updateOne({ _id: id }, req.body, function(err, doc) {
        if (err) return handleError(err);
        res.send(doc);
    });
};

module.exports.addNew = function(req, res) {
    const service = new Service(req.body);
    service.save(function(err) {
        if (err) return handleError(err);
        res.send(service);
    });
};
