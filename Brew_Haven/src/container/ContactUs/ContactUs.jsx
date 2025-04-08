import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Toaster, toast } from "react-hot-toast"; // Import react-hot-toast
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUs.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/contact", formData); // Use axios for POST request
      if (response.status === 201) {
        toast.success(response.data.message || "Form submitted successfully!");
        setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "", message: "" });
      } else {
        toast.error("Error: " + (response.data.message || "Something went wrong!"));
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center">
      <Toaster position="top-center" reverseOrder={false} /> {/* Add Toaster */}
      <div className="col-12 col-md-10 col-lg-8">
        <form className="form-box w-100" onSubmit={handleSubmit}>
          <div className="container-block form-wrapper w-100">
            <p className="text-blk contactus-head">Get in Touch</p>
            <p className="text-blk contactus-subhead">Nunc erat cursus tellus gravida.</p>
            <div className="row">
              <div className="col-md-6 mb-3">
                <p className="text-blk input-title">FIRST NAME</p>
                <input
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Please enter first name..."
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <p className="text-blk input-title">LAST NAME</p>
                <input
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Please enter last name..."
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <p className="text-blk input-title">EMAIL</p>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Please enter email..."
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <p className="text-blk input-title">PHONE NUMBER</p>
                <input
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Please enter phone number..."
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <p className="text-blk input-title">WHAT DO YOU HAVE IN MIND</p>
                <textarea
                  className="form-control"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please enter query..."
                  required
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;