import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthForm.css";
import {
  sendOtp,
  verifyOtp,
  forgetPsswordSendOtp,
  forgetPasswordVerifyOtp,
  resetpassword,
} from "../../api";
import { Toaster, toast } from 'react-hot-toast';

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const response = await forgetPsswordSendOtp(formData.email);
      console.log("OTP Send Response:", response.data);

      if (response.data.success) {
        toast.success("OTP sent successfully!");
        setStep(2);
      } else {
        toast.error(response.data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data);
      toast.error(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const response = await forgetPasswordVerifyOtp(
        formData.email,
        formData.otp
      );
      console.log("OTP Verify Response:", response.data);

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        setStep(3);
      } else {
        toast.error(response.data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data);
      toast.error(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.newPassword || !formData.confirmPassword || !formData.otp) {
      toast.error("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await resetpassword({
        email: formData.email,
        password: formData.newPassword,
        cpassword: formData.confirmPassword,
        otp: formData.otp,
      });

      if (response.data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error.response?.data);
      toast.error(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-form-container">
      <Toaster />
      <h2 className="auth-form-title">Reset Password</h2>

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="auth-form">
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
          <button type="submit" className="auth-form-button">
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="auth-form">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            required
            placeholder="Enter the OTP"
          />
          <button type="submit" className="auth-form-button">
            Verify OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="auth-form">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            placeholder="Enter new password"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm new password"
          />
          <button type="submit" className="auth-form-button">
            Reset Password
          </button>
        </form>
      )}

      <p className="auth-form-footer">
        Remember your password?{" "}
        <Link to="/login" className="auth-form-link">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordForm;
