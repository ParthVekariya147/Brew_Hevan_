const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController'); // Adjust the path as necessary

// Staff routes
router.post('/staff', staffController.createStaffMember);
router.get('/staff', staffController.getAllStaffMembers); // This should be the route for fetching all staff members
router.get('/staff/:id', staffController.getStaffMemberById);
router.put('/staff/:id', staffController.updateStaffMember);
router.delete('/staff/:id', staffController.deleteStaffMember);

module.exports = router; 