const Inventory = require('../models/inventory');
const mongoose = require('mongoose');

module.exports.get = function(req, res) {
    Inventory.find()
        .exec()
        .then(docs => {
            res.render('inventory', {
                items: docs
            });
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

module.exports.getForm = function(req, res) {
    res.render('inventoryForm');
};

module.exports.getEditForm = function(req, res) {
    Inventory.findById(req.params.id)
        .exec()
        .then(docs => {
            res.render('inventoryEdit', {
                item: docs
            });
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

module.exports.delete = function(req, res) {
    const id = req.params.id;
    Inventory.deleteOne({ _id: id }, function(err) {
        if (err) return res.status(404).send(err);
        // deleted at most one tank document
        res.sendStatus(200);
    });
};

module.exports.update = function(req, res) {
    const id = req.params.id;

    Inventory.updateOne({ _id: id }, req.body, function(err, doc) {
        if (err) return res.status(404).send(err);

        // deleted at most one tank document

        res.send(doc);
    });
};

module.exports.addNew = function(req, res) {
    const inventory = new Inventory(req.body);
    inventory.save(function(err) {
        if (err) {
            res.render('inventoryForm');
        }
        res.render('inventoryForm');
    });
};
