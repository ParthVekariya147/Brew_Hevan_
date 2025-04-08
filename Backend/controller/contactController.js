const Contact = require("../model/Contact");

// Handle Contact Form Submission
exports.submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    const newContact = new Contact({ firstName, lastName, email, phoneNumber, message });
    await newContact.save();
    res.status(201).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Handle Fetching All Contact Messages
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch contacts", error });
  }
};
