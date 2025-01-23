const mongoose = require('mongoose');

// Define the Menu Schema
const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    tag: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['wines', 'cocktails', 'Hotcoffee', 'Coldcoffee', 'pizzas', 'burgers', 'sandwiches', 'frenchFries', 'Chinese', 'Cakes', 'IceCreams'], // Add categories as needed
        trim: true
    },
    status: {
        type: String,
        default: "" // Optional: Default value for status
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Menu model
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
