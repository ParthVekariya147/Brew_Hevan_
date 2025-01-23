// @ts-ignore
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './LoginForm.css';
import { login } from '../../api/api';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    token: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');

      const response = await login("login", {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        authLogin(token);
        navigate('/');
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
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
        <button type="submit" className="auth-form-button">Login</button>
      </form>
      <p className="auth-form-footer">
        Don't have an account?{' '}
        <Link to="/register" className="auth-form-link">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
