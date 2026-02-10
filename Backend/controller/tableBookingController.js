const TableBooking = require("../model/TableBookingSchema");
const sendMail = require("../Utility/mailer");

exports.bookTable = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingBooking = await TableBooking.findOne({ email, date, time });
    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "You already have a booking at this time." });
    }

    const booking = await TableBooking.create({
      name,
      email,
      phone,
      date,
      time,
      guests,
      userId: req.user._id,
    });

    const bookingResponse = {
      _id: booking._id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
    };

    res.status(201).json({
      message: "Table booked successfully!",
      booking: bookingResponse,
    });
  } catch (error) {
    console.error("Error booking table:", error);
    res.status(500).json({ error: "Failed to book the table." });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const bookings = await TableBooking.find({ userId: req.user._id })
      .select("-createdAt -updatedAt -__v")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBookings = await TableBooking.countDocuments({
      userId: req.user._id,
    });

    res.status(200).json({
      totalBookings,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBookings / limit),
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await TableBooking.find()
      .select("-createdAt -updatedAt -__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalBookings: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ error: "Failed to fetch all bookings." });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, date, time, guests } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const booking = await TableBooking.findByIdAndUpdate(
      id,
      { name, email, phone, date, time, guests },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Failed to update booking." });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await TableBooking.findByIdAndDelete(id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking." });
  }
};

// Helper function to send booking confirmation email
const sendBookingConfirmation = async (email, bookingDetails) => {
  const subject = "Table Booking Confirmation - Brew Haven";
  const text = `Dear ${bookingDetails.name},\n\nYour table booking has been confirmed!\n\nDetails:\n- Date: ${bookingDetails.date}\n- Time: ${bookingDetails.time}\n- Guests: ${bookingDetails.guests}\n\nThank you for choosing Brew Haven!`;

  return sendMail(email, subject, text);
};

exports.sendConfirmationEmail = async (req, res) => {
  try {
    const { email, bookingDetails } = req.body;

    await sendBookingConfirmation(email, bookingDetails);

    res.status(200).json({ success: true, message: 'Confirmation email sent!' });
  } catch (err) {
    console.error('Error sending confirmation email:', err);
    res.status(500).json({ success: false, message: 'Failed to send confirmation email.' });
  }
};