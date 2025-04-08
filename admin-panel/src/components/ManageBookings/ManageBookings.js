import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {
  getadminbookings,
  updateBooking,
  deleteBooking,
  booktable,
} from "../../api/api";
import "./ManageBookings.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const formatTime = (time) => {
  if (!time) {
    return "";
  }
  const [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${period}`;
};


const ManageBookingsContainer = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getadminbookings();
        if (response && response.data) {
          setBookings(response.data.bookings);
        }
      } catch (error) {
        setError("Failed to fetch bookings.");
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBooking) {
        const response = await updateBooking(currentBooking._id, formData);
        if (response && response.data) {
          setBookings(
            bookings.map((booking) =>
              booking._id === currentBooking._id ? response.data : booking
            )
          );
          toast.info("Booking updated successfully!");
        }
      } else {
        const response = await booktable(formData);
        if (response && response.data) {
          setBookings([...bookings, response.data]);
          toast.success("Booking added successfully!");
        }
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Error saving booking.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(id);
        setBookings(bookings.filter((booking) => booking._id !== id));
        toast.success("Booking deleted successfully!");
      } catch (error) {
        console.error("Error deleting booking:", error);
        toast.error("Error deleting booking.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBooking(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
    });
  };

  const handleShowModal = (booking = null) => {
    if (booking) {
      setCurrentBooking(booking);
      setFormData(booking);
    }
    setShowModal(true);
  };

  if (loading) return <p className="loading-message">Loading bookings...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h1>Manage Bookings</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>
        <FaPlus className="me-2" />
        Add Booking
      </Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{formatDate(booking.date)}</td>
              <td>{formatTime(booking.time)}</td>
              <td>{booking.guests}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(booking)}
                >
                  <FaEdit /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(booking._id)}
                >
                  <FaTrash /> Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Booking Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentBooking ? "Edit Booking" : "Add Booking"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Guests</Form.Label>
              <Form.Control
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="text-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentBooking ? "Update" : "Add"} Booking
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default ManageBookingsContainer;
