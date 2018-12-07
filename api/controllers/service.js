const Service = require('../models/service');
const ServiceType = require('../models/serviceType');

module.exports.get = function(req, res) {
    Service.find()
        .populate('type')
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
        res.sendStatus(200);
    });
};

module.exports.update = function(req, res) {
    const id = req.params.id;
    Service.updateOne({ _id: id }, req.body, function(err, doc) {
        if (err) return handleError(err);
        res.send(doc);
    });
};

module.exports.getForm = function(req, res) {
    ServiceType.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.render('serviceForm', { serviceTypes: docs });
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

module.exports.addNew = function(req, res) {
    const service = new Service(req.body);
    service.save(function(err) {
        ServiceType.find()
            .exec()
            .then(docs => {
                console.log(docs);
                res.render('serviceForm', { serviceTypes: docs });
            })
            .catch(err => {
                res.status(500).json(err.message);
                console.log(err.message);
            });
    });
};
