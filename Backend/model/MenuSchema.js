const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tag: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "wines",
      "cocktails",
      "Hotcoffee",
      "Coldcoffee",
      "pizzas",
      "burgers",
      "sandwiches",
      "frenchFries",
      "Chinese",
      "Cakes",
      "IceCreams",
    ],
    trim: true,
  },
  status: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
