const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const tableBookingController = require("../controller/tableBookingController");
// const menuController = require("../controller/menuController");
const staffRoutes = require("./staffRoutes"); // Import the staff routes
const auth = require("../middleware/auth");

// User routes
router.post("/reg", userController.Register);
router.post("/login", userController.Login);
router.get("/getData", auth.check_token, userController.getData);

// Table booking routes
router.post("/book-table", auth.check_token, tableBookingController.bookTable);
router.get("/bookings", auth.check_token, tableBookingController.getBookings);

// New route for fetching all bookings by admin
// router.post('/admin/tableBookings', tableBookingController.createBooking)
router.get("/admin/bookings", tableBookingController.getAllBookings);
router.put("/admin/bookings/:id", tableBookingController.updateBooking);
router.delete("/admin/bookings/:id", tableBookingController.deleteBooking);

// OTP routes
router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);

// Use staff routes
router.use(staffRoutes); // Apply staff-related routes

router.use("/menu", require("./menuRoutes"));

module.exports = router;
