const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema');

const otpModel = require('../model/otp');
const otpGenerator = require('otp-generator');
const sendMail = require('../Utility/mailer');
const OTP = require('../model/otp'); // Assuming you have an OTP model

// const twilio = require('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const twilioClient = new twilio(accountSid, authToken);

exports.Register = async(req,res) => {
    try {
        const { name, email, phone, password, cpassword } = req.body;
        
        // Validation
        if(!name || !email || !phone || !password || !cpassword) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        // Check if passwords match
        if(password !== cpassword) {
            return res.status(400).json({
                success: false,
                error: "Passwords do not match"
            });
        }

        // Check if user exists
        const userExist = await User.findOne({ 
            $or: [
                { email: email },
                { phone: phone }
            ]
        });

        if(userExist) {
            return res.status(400).json({
                success: false,
                error: "User already exists"
            });
        }

        // Create new user
        const user = new User({
            name,
            email,
            phone,
            password,
            cpassword
        });

        // Save user
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            error: "Registration failed",
            message: error.message
        });
    }
}

exports.Login = async(req,res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        // Generate JWT token
        console.log("User:", process.env.SECRET_KEY);
        
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            error: "Login failed",
            message: error.message
        });
    }
}

exports.getData = async(req,res) => {
    try {
        res.send("Hello")
    } catch (error) {
        error
    }
}
exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    try {
        await sendMail(email, 'Your OTP Code', `Your OTP code is ${otp}`);
        const newOtp = new OTP({ email, otp });
        await newOtp.save();
        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error("Error sending OTP:", error); // Log error
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const validOtp = await OTP.findOne({ email, otp });
        if (!validOtp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error("Error verifying OTP:", error); // Log error
        res.status(500).json({ success: false, message: 'Failed to verify OTP' });
    }
};
