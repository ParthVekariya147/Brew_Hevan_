const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true },
    cost_price: { type: Number, required: true },
    selling_price: { type: Number, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema); 