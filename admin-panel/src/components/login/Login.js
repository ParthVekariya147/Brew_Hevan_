import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthForm.css";
import { AdminLogin } from "../../api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    token: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");

      const response = await AdminLogin("/admin/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
        toast.success("Login successful!");
      } else {
        setError(response.data.error);
        toast.error(response.data.error);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
        {error && <div className="auth-form-error">{error}</div>}
        <button type="submit" className="auth-form-button">
          Login
        </button>
      </form>
      <p className="auth-form-footer">
        Don't have an account?{" "}
        <Link to="/register" className="auth-form-link">
          Register here
        </Link>{" "}
        {/* Use Link instead of <a> */}
      </p>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
