import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../Alert/Alert";
import "./AuthForm.css";
import { sendOtp, verifyOtp, forgetPsswordSendOtp , forgetPasswordVerifyOtp , resetpassword } from "../../api"; // Import the APIs

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP, 3: Reset Password
  const [alert, setAlert] = useState(null);
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
      setAlert({ message: "Please enter your email address", type: "error" });
      return;
    }

    try {
      const response = await forgetPsswordSendOtp(formData.email);
      console.log("OTP Send Response:", response.data); // Debugging log

      if (response.data.success) {
        setAlert({ message: "OTP sent successfully!", type: "success" });
        setStep(2); // Move to the OTP verification step
      } else {
        setAlert({
          message: response.data.error || "Failed to send OTP",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data);
      setAlert({
        message:
          error.response?.data?.error || "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setAlert({ message: "Please enter the OTP", type: "error" });
      return;
    }

    try {
      const response = await forgetPasswordVerifyOtp(formData.email, formData.otp);
      console.log("OTP Verify Response:", response.data); // Debugging log

      if (response.data.success) {
        setAlert({ message: "OTP verified successfully!", type: "success" });
        setStep(3); // Move to the reset password step
      } else {
        setAlert({
          message: response.data.error || "Invalid OTP",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data);
      setAlert({
        message:
          error.response?.data?.error || "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.newPassword || !formData.confirmPassword || !formData.otp) {
      setAlert({ message: "All fields are required", type: "error" });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setAlert({ message: "Passwords do not match", type: "error" });
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
        setAlert({ message: "Password reset successfully!", type: "success" });
        navigate("/login");
      } else {
        setAlert({
          message: response.data.error || "Failed to reset password",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error.response?.data);
      setAlert({
        message:
          error.response?.data?.error || "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Reset Password</h2>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

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
