// ResetPasswordForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import Alert from 'components/Alert/Alert';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(user => user.email === email);

    if (userIndex === -1) {
      setAlert({ message: 'User not found!', type: 'error' });
      return;
    }

    if (newPassword.length < 4) {
      setAlert({ message: 'Password must be at least 4 characters long.', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlert({ message: "Passwords don't match!", type: 'error' });
      return;
    }

    storedUsers[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(storedUsers));
    setAlert({ message: 'Password reset successful!', type: 'success' });

    setTimeout(() => {
      navigate('/login');
    }, 14000); // Redirect after 1 second
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Reset Password</h2>
      {alert && <Alert message={alert.message} type={alert.type} onClose={undefined} />}
      <form onSubmit={handleResetPassword} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          placeholder="Enter new password"
        />
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm new password"
        />
        <button type="submit" className="auth-form-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
