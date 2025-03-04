import React, { useState } from "react";
import { AdminRegister } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match", { closeButton: false });
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.cpassword ||
      !formData.role
    ) {
      toast.error("All fields are required", { closeButton: false });
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits.", { closeButton: false });
      return;
    }

    console.log("Form data:", formData);

    try {
      const response = await AdminRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
        phone: formData.phone,
        role: formData.role,
      });

      console.log("API Response:", response);
      if (response.status === 201) {
        toast.success("Registration successful!", { closeButton: false });
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
          role: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Registration failed. Please try again.", { closeButton: false });
      }
    } catch (error) {
      console.error("API error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "An error occurred. Please try again.";
      toast.error(errorMessage, { closeButton: false });
    }
  };

  return (
    <div className="register-form-container">
      <ToastContainer />
      <h2>Register</h2>
      {error && (
        <p className="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {success && (
        <p className="success" style={{ color: "green" }}>
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a strong password"
            required
            style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
          />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            required
            style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
          />
        </div>

        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            {/* Add more roles as needed */}
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
