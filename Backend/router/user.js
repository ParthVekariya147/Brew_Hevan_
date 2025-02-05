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
// router.post("/forgotPassword", userController.forgotPassword);
// router.post("/resetPassword", userController.resetPassword);

//admin routes
router.post("/admin/reg", userController.RegisterAdmin);
router.post("/admin/login", userController.LoginAdmin);

// Table booking routes
router.post("/book-table", auth.check_token, tableBookingController.bookTable);
router.get("/bookings", auth.check_token, tableBookingController.getBookings);

// New route for fetching all bookings by admin
router.get("/admin/bookings", tableBookingController.getAllBookings);
router.put("/admin/bookings/:id", tableBookingController.updateBooking);
router.delete("/admin/bookings/:id", tableBookingController.deleteBooking);

// OTP routes
router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);

// New routes for forgot password
router.post("/forgot-password/send-otp", userController.sendForgotPasswordOtp);
router.post("/forgot-password/verify-otp", userController.verifyForgotPasswordOtp);
router.post("/reset-password", userController.resetPassword); // New route for resetting password

// Use staff routes
router.use(staffRoutes); // Apply staff-related routes

router.use("/menu", require("./menuRoutes"));

module.exports = router;
