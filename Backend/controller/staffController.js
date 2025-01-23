const Staff = require('../model/StaffSchema');
const mongoose = require('mongoose');

const staffController = {
    // Create new staff member
    createStaff: async (req, res) => {
        try {
            const newStaff = new Staff(req.body);
            const savedStaff = await newStaff.save();
            res.status(201).json(savedStaff);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get all staff members
    getAllStaff: async (req, res) => {
        try {
            const staffMembers = await Staff.find();
            res.status(200).json(staffMembers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get single staff member
    getStaffById: async (req, res) => {
        try {
            const staff = await Staff.findById(req.params.id);
            if (!staff) {
                return res.status(404).json({ message: 'Staff member not found' });
            }
            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update staff member
    updateStaff: async (req, res) => {
        try {
            // Validate ObjectId format
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            // Update staff member
            const updatedStaff = await Staff.findByIdAndUpdate(
                req.params.id,  // Directly use the ID
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedStaff) {
                return res.status(404).json({ message: 'Staff member not found' });
            }

            res.status(200).json(updatedStaff);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete staff member
    deleteStaff: async (req, res) => {
        try {
            const staff = await Staff.findByIdAndDelete(req.params.id);
            if (!staff) {
                return res.status(404).json({ message: 'Staff member not found' });
            }
            res.status(200).json({ message: 'Staff member deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = staffController; 