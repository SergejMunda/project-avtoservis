const Service = require('../models/service');
const ServiceType = require('../models/serviceType');
const User = require('../models/users');
const Inventory = require('../models/inventory');

const servicesPreset = require('../presets/service.json');
const usersPreset = require('../presets/user.json');
const inventoryPreset = require('../presets/inventory.json');

module.exports.delete = function(req, res) {
    Service.deleteMany({}, function(err) {
        if (err) return res.status(404).send(err);
        // deleted at most one tank document
    });
    User.deleteMany({}, function(err) {
        if (err) return res.status(404).send(err);
        // deleted at most one tank document
    });
    Inventory.deleteMany({}, function(err) {
        if (err) return res.status(404).send(err);
        // deleted at most one tank document
    });
    ServiceType.deleteMany({}, function(err) {
        if (err) return res.status(404).send(err);
        // deleted at most one tank document
    });
    res.sendStatus(200);
};

module.exports.loadPresets = function(req, res) {
    // console.log(servicesPreset);
    ServiceType.insertMany([{ type: 'Menjava gum' }, { type: 'Menjava olja' }]).then(data => {
        ServiceType.findOne({ type: 'Menjava gum' })
            .exec()
            .then(function(id) {
                for (service in servicesPreset) {
                    servicesPreset[service].type = id._id;
                }
                console.log('test', servicesPreset);
                Service.insertMany(servicesPreset);
            });
    });
    User.insertMany(usersPreset);
    Inventory.insertMany(inventoryPreset);

    res.sendStatus(200);
};
