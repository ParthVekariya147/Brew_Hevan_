// backend/src/models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  items: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, required: true, enum: ['Pending', 'In Progress', 'Completed'] },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;