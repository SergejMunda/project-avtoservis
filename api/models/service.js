const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    time: String,
    // type:c String,
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' }
});

module.exports = mongoose.model('service', serviceSchema);
