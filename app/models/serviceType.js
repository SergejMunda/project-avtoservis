var mongoose = require('mongoose');

const serviceType = mongoose.Schema({
    type: { type: String, required: true }
});

module.exports = mongoose.model('ServiceType', serviceType);
