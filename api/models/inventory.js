const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

const inventorySchema = mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0, max: 1000000 }
});

inventorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('inventory', inventorySchema);
