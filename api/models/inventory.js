const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    itemName: String,
    description: String,
    quantity: String
});


module.exports = mongoose.model('inventory', inventorySchema);