const Inventory = require('../models/inventory');
const mongoose = require('mongoose');

module.exports.get = function (req, res) {
    Inventory.find()
        .exec()
        .then(docs => {
            res.render('inventory', {
                inventory: docs
            });
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

module.exports.getForm = function (req, res) {
    res.render('inventoryForm');
};

module.exports.addNew = function (req, res) {
    const inventory = new Inventory(req.body);
    inventory.save(function (err) {
        if (err) {
            res.render('inventoryForm');
        }
        res.render('inventoryForm');
    });

};