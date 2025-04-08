const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  items: { type: [itemSchema], required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "In Progress", "Completed"],
  },
}, { timestamps: true }); // Enable timestamps to track createdAt and updatedAt

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
