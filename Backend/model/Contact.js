const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });  // ✅ Enable timestamps

module.exports = mongoose.model("Contact", contactSchema);
