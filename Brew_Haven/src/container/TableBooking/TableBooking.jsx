import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TableBooking.css";

const TableBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    period: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Please log in to book a table.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); 

    if (!/^\d{10}$/.test(formData.phone)) {
      setMessage("Phone number must be 10 digits.");
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    if (selectedDate < today) {
      setMessage("Date must be today or in the future.");
      return;
    }

    const selectedTime = formData.time;
    if (!selectedTime) {
      setMessage("Please select a valid time.");
      return;
    }

    if (!token) {
      setMessage("Authentication required. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/book-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Table booked successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          period: "",
        });
      } else {
        setMessage(result.error || "Failed to book the table.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="table-booking-container">
      <h2 className="page-title">Book a Table</h2>
      <form onSubmit={handleSubmit} className="table-booking-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your Email"
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Your Phone Number"
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="time">Time</label>
        <div className="time-selection">
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <label htmlFor="guests">Number of Guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
          placeholder="Number of Guests"
          min="1"
        />

        <button type="submit" className="form-button">
          Book Table
        </button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default TableBooking;
