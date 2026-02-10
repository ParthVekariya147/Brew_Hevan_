const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const tableBookingController = require("../controller/tableBookingController");
const inventoryController = require("../controller/inventoryController");
const newsletterController = require("../controller/newsletterController");
const staffRoutes = require("./staffRoutes");
const auth = require("../middleware/auth");
const invetoryRoutes = require("./inventoryRoutes");

router.post("/reg", userController.Register);
router.post("/login", userController.Login);

router.post("/admin/reg", userController.RegisterAdmin);
router.post("/admin/login", userController.LoginAdmin);

router.post("/book-table", auth.check_token, tableBookingController.bookTable);
router.get("/bookings", auth.check_token, tableBookingController.getBookings);

router.get("/admin/bookings", tableBookingController.getAllBookings);
router.put("/admin/bookings/:id", tableBookingController.updateBooking);
router.delete("/admin/bookings/:id", tableBookingController.deleteBooking);
router.post('/sendconfirmation', tableBookingController.sendConfirmationEmail);

router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);

router.post("/forgot-password/send-otp", userController.sendForgotPasswordOtp);
router.post(
  "/forgot-password/verify-otp",
  userController.verifyForgotPasswordOtp
);
router.post("/reset-password", userController.resetPassword);

router.use(staffRoutes);
router.use(invetoryRoutes);

router.use("/menu", require("./menuRoutes"));

router.post("/subscribe", newsletterController.subscribe);

module.exports = router;
