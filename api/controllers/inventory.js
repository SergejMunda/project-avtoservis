const Inventory = require('../models/inventory');
const mongoose = require('mongoose');

const options = {
    page: 1,
    limit: 10
};

module.exports.get = function(req, res) {
    if (req.query.page) {
        options.page = req.query.page;
    }
    Inventory.paginate({}, options)
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

module.exports.getOne = function(req, res) {
    const id = req.params.id;
    Inventory.findOne({ _id: id })
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
    Inventory.deleteOne({ _id: id }, function(err) {
        if (err) return handleError(err);
        // deleted at most one tank document
        res.status(204).json();
    });
};

module.exports.update = function(req, res) {
    const id = req.params.id;

    Inventory.updateOne({ _id: id }, req.body, function(err, doc) {
        if (err) return handleError(err);

        // deleted at most one tank document

        res.send(doc);
    });
};

module.exports.addNew = function(req, res) {
    const inventory = new Inventory(req.body);
    inventory.save(function(err) {
        if (err) return handleError(err);
        res.send(inventory);
    });
};
