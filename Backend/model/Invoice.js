const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    customerName: String,
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
        }
    ],
    totalAmount: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
