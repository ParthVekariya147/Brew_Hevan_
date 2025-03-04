const mongoose = require("mongoose");

const TableBookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= new Date().setHours(0, 0, 0, 0);
        },
        message: "Booking date must be today or in the future.",
      },
    },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TableBooking = mongoose.model("TableBooking", TableBookingSchema);

module.exports = TableBooking;
