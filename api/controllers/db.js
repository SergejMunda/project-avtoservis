const Service = require('../models/service');
const ServiceType = require('../models/serviceType');
const User = require('../models/user');
const Inventory = require('../models/inventory');

const servicesPreset = require('../presets/service.json');
const usersPreset = require('../presets/user.json');
const inventoryPreset = require('../presets/inventory.json');

const mongoose = require('mongoose');

findTypes = function(name){
    ServiceType.findOne({type : name})
        .exec()
        .then(function(id){ console.log(id); return id });
}

module.exports.delete = function(req, res) {
    Service.deleteMany({}, function(err) {
        if (err) return handleError(err);
        // deleted at most one tank document
    });
    User.deleteMany({}, function(err) {
        if (err) return handleError(err);
        // deleted at most one tank document
    });
    Inventory.deleteMany({}, function(err) {
        if (err) return handleError(err);
        // deleted at most one tank document
    });
    ServiceType.deleteMany({}, function(err) {
        if (err) return handleError(err);
        // deleted at most one tank document
    });
};

module.exports.get = function(req, res) {
    res.render('db');
};

module.exports.loadPresets = function(req, res) {
   // console.log(servicesPreset);
    ServiceType.insertMany([
        {type : "Menjava gum"},
        {type : "Menjava olja"}
    ]);
    ServiceType.findOne({type : 'Menjava gum'})
        .exec()
        .then(function(id){
            for (service in servicesPreset){
            servicesPreset[service].type = id._id;
            }
            console.log(servicesPreset);
            Service.insertMany(servicesPreset);
        });
    /*var serviceArray = [];
    for (service in servicesPreset){
        service.type = findTypes("Menjava gum");
        serviceArray.push(service);
        
    }*/
    //console.log(servicesPreset);
    //Service.insertMany(servicesPreset);
    
    /*Service.insertOne({
        firstName : 'Janez',
        lastName : 'Novak',
        email : 'jNovak@gmail.com',
        phoneNumber : '031457375',
        type : findTypes('Menjava gum')
    });*/
    User.insertMany(usersPreset);
    Inventory.insertMany(inventoryPreset);
};
