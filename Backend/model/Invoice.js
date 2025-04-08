const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    customerName: String,
    items: [
        {
            name: String,
            price: Number, // Price in INR
            quantity: Number,
        }
    ],
    totalAmount: Number, // Total amount in INR
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
