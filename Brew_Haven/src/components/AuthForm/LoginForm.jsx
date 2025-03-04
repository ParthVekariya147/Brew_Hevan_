// @ts-ignore
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';
import { login } from '../../api';
import { Toaster, toast } from 'react-hot-toast';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    token: ''
  });
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
      const response = await login("login", {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-form-container">
      <Toaster />
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
        <button type="submit" className="auth-form-button">Login</button>
      </form>
      <p className="auth-form-footer">
        Forgot your password?{' '}
        <Link to="/resetpassword" className="auth-form-link">Reset it here</Link>
      </p>
      <p className="auth-form-footer">
        Don't have an account?{' '}
        <Link to="/register" className="auth-form-link">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
