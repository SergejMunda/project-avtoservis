const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    time: String,
    type: String
});


module.exports = mongoose.model('service', serviceSchema);