const mongoose = require('mongoose');

const audienceSchema = mongoose.Schema({
    time: { type: Date, required: true },
    user: { type: String, required: true },
    page: { type: String, required: true }
});

module.exports = mongoose.model('audience', audienceSchema);
