const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');
const auth = require('../middleware/auth');

// Staff management routes
router.post('/staff', auth.check_token, staffController.createStaff);
router.get('/staff', auth.check_token, staffController.getAllStaff);
router.get('/staff/:id', auth.check_token, staffController.getStaffById);
router.put('/staff/:id', auth.check_token, staffController.updateStaff);
router.delete('/staff/:id', auth.check_token, staffController.deleteStaff);

module.exports = router;
