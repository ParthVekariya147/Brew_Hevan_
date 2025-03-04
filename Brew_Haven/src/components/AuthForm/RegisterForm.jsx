import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../Alert/Alert";
import "./AuthForm.css";
import { register, sendOtp, verifyOtp } from "../../api";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });

  const [otpData, setOtpData] = useState({
    otp: "",
    isOtpSent: false,
    isOtpVerified: false,
  });

  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtpData({
      ...otpData,
      otp: e.target.value,
    });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setAlert({ message: "Please enter Email Address", type: "error" });
      return;
    }

    try {
      const response = await sendOtp(formData.email);
      if (response.data.success) {
 
        setOtpData((prev) => ({ ...prev, isOtpSent: true }));
        setAlert({ message: "OTP sent successfully!", type: "success" });
      } else {
        setAlert({
          message: response.data.message || "Failed to send OTP",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setAlert({
        message: error.response?.data?.message || "Unexpected server error.",
        type: "error",
      });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpData.otp) {
      setAlert({ message: "Please enter OTP", type: "error" });
      return;
    }
    try {
      const response = await verifyOtp(formData.email, otpData.otp);
      if (response.data.success) {
    
        setOtpData({ ...otpData, isOtpVerified: true });
        setAlert({ message: "OTP verified successfully!", type: "success" });
      } else {
        setAlert({ message: "Invalid OTP", type: "error" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setAlert({
        message: error.response?.data?.message || "Unexpected server error.",
        type: "error",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpData.isOtpVerified) {
      setAlert({ message: "Please verify your Email Address", type: "error" });
      return;
    }

    if (formData.password.length < 4) {
      setAlert({
        message: "Password must be at least 4 characters long.",
        type: "error",
      });
      return;
    }

    if (formData.password !== formData.cpassword) {
      setAlert({ message: "Passwords don't match!", type: "error" });
      return;
    }

    try {
      const response = await register("reg", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
        phone: formData.phone,
      });

      if (response.status === 201) {

        setFormData({
          username: "",
          email: "",
          password: "",
          cpassword: "",
          phone: "",
        });
        setAlert({
          message: "Registration successful! Redirecting to login...",
          type: "success",
        });


        setTimeout(() => {
          navigate("/login");
        }, 1000)
        setAlert({ message: "Registration failed", type: "error" });
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data); 
      setAlert({
        message: error.response?.data?.message || "Unexpected server error.",
        type: "error",
      });
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Register</h2>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter Username"
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Enter phone number"
        />

        <div className="Email-verification-section">
          <label htmlFor="email">Email Address</label>
          <div className="otp-input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              s
              onChange={handleChange}
              required
              placeholder="Enter Email"
              disabled={otpData.isOtpVerified}
            />

            <button
              type="button"
              onClick={handleSendOtp}
              className="otp-button"
              disabled={otpData.isOtpVerified}
            >
              {otpData.isOtpSent ? "Resend OTP" : "Send OTP"}
            </button>
          </div>
        </div>

        <div className="otp-section">
          <label htmlFor="otp">Enter OTP</label>
          <div className="otp-input-group">
            <input
              type="text"
              id="otp"
              value={otpData.otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              maxLength={6}
            />

            <button
              type="button"
              onClick={handleVerifyOtp}
              className="otp-button"
              disabled={otpData.isOtpVerified}
            >
              {otpData.isOtpVerified ? "OTP Verified" : "Verify OTP"}
            </button>
          </div>
        </div>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter Password"
        />

        <label htmlFor="cpassword">Confirm Password</label>
        <input
          type="password"
          id="cpassword"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleChange}
          required
          placeholder="Enter Confirm Password"
        />

        <button
          type="submit"
          className="auth-form-button"
          disabled={!otpData.isOtpVerified}
        >
          Register
        </button>
      </form>
      <p className="auth-form-footer">
        Already have an account?{" "}
        <Link to="/login" className="auth-form-link">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
