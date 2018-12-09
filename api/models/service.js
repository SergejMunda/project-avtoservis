const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: Number},
    time: {type: Date, "default": Date.now},
    // type:c String,
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' }
});

module.exports = mongoose.model('service', serviceSchema);
