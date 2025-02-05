import React, { useState } from 'react';
import { AdminRegister } from '../../api/api'; // Import the new AdminRegister function
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './RegisterForm.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        cpassword: '',
        role: '', // Added role field
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(''); // Clear previous error on typing
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Check if passwords match
        if (formData.password !== formData.cpassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate all fields are filled
        if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.cpassword || !formData.role) {
            setError('All fields are required');
            return;
        }

        console.log('Form data:', formData);

        // Now make the API call to register the user using AdminRegister
        AdminRegister({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            cpassword: formData.cpassword,
            phone: formData.phone,
            role: formData.role,  // Send role data to API
        })
        .then((response) => {
            console.log('API Response:', response);
            if (response.status === 201) {
                setSuccess('Registration successful!');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    cpassword: '',
                    phone: '',
                    role: '',  // Reset role field after successful registration
                });
                setTimeout(() => {
                    // After a successful registration, navigate to the login page
                    navigate('/login'); // You can change '/login' to your login page route
                }, 1000);
            } else {
                setError('Registration failed. Please try again.');
            }
        })
        .catch((error) => {
            console.error('API error:', error);
            const errorMessage = error?.response?.data?.error || 'An error occurred. Please try again.';
            setError(errorMessage);
        });
    };

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            {success && <p className="success" style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
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
                        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
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
                        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
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
                        style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
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
                        style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
                    />
                </div>

                <div>
                    <label>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
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
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        width: '100%',
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
