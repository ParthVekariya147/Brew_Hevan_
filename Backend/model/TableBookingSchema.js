const mongoose = require('mongoose');

const TableBookingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }, // Added phone number field
        date: { 
            type: Date, 
            required: true,
            validate: {
                validator: function(value) {
                    return value >= new Date().setHours(0, 0, 0, 0); // Ensure date is not in the past
                },
                message: 'Booking date must be today or in the future.'
            }
        },
        time: { type: String, required: true },
        guests: { type: Number, required: true, min: 1 },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference the user model
            required: true,
        },
    },
    { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

const TableBooking = mongoose.model('TableBooking', TableBookingSchema);

module.exports = TableBooking;