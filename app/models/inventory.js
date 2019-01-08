const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    itemName: {type: String, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true, min: 0, max: 1000000}
});


module.exports = mongoose.model('inventory', inventorySchema);