const Staff = require("../model/StaffSchema");
const mongoose = require("mongoose");

const staffController = {
  createStaff: async (req, res) => {
    const { name, role, email, phone, status } = req.body;

    if (!/^\d{10}$/.test(phone)) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 10 digits." });
    }

    try {
      const newStaff = new Staff({ name, role, email, phone, status });
      const savedStaff = await newStaff.save();
      res.status(201).json(savedStaff);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllStaff: async (req, res) => {
    try {
      const staffMembers = await Staff.find();
      res.status(200).json(staffMembers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getStaffById: async (req, res) => {
    try {
      const staff = await Staff.findById(req.params.id);
      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      res.status(200).json(staff);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateStaff: async (req, res) => {
    const { phone } = req.body;

    if (phone && !/^\d{10}$/.test(phone)) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 10 digits." });
    }

    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updatedStaff = await Staff.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedStaff) {
        return res.status(404).json({ message: "Staff member not found" });
      }

      res.status(200).json(updatedStaff);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteStaff: async (req, res) => {
    try {
      const staff = await Staff.findByIdAndDelete(req.params.id);
      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      res.status(200).json({ message: "Staff member deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = staffController;
