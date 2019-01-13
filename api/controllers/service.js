const Service = require('../models/service');
const ServiceType = require('../models/serviceType');
var jwtDecode = require('jwt-decode');

const options = {
    page: 1,
    limit: 10,
    populate: 'type'
};

module.exports.get = function(req, res) {
    if (req.query.page) {
        options.page = req.query.page;
    }
    Service.paginate({}, options)
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
    var decoded = jwtDecode(req.headers.authorization);
    if (decoded.permissions.includes('ADMIN')) {
        const id = req.params.id;
        Service.deleteOne({ _id: id }, function(err) {
            if (err) return res.status(404).send(err);
            res.sendStatus(204);
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports.update = function(req, res) {
    const id = req.params.id;
    Service.updateOne({ _id: id }, req.body, function(err, doc) {
        if (err) return res.status(404).send(err);
        res.send(doc);
    });
};

module.exports.addNew = function(req, res) {
    const service = new Service(req.body);
    service.save(function(err) {
        if (err) return res.status(404).send(err);
        res.send(service);
    });
};
