var mongoose = require('mongoose');

const serviceType = mongoose.Schema({
    type: String
});

module.exports = mongoose.model('ServiceType', serviceType);
