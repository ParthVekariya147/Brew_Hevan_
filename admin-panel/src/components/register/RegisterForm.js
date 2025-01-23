import React, { useState } from 'react';
import { register } from '../../api/api';
import './RegisterForm.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        cpassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

        console.log('Form data:', formData);
        register('reg', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            cpassword: formData.cpassword,
            phone: formData.phone
          })
            .then((response) => {
              if (response.status === 201) {
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  cpassword: '',
                  phone: ''
                });
                // setAlert({ message: 'Registration successful!', type: 'success' });
                setTimeout(() => {
                //   navigate('/login');
                console.log('Registration successful!');
                }, 1000);
              }
            })
            .catch((error) => {
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
                    <label>cpassword:</label>
                    <input
                        type="cpassword"
                        name="cpassword"
                        value={formData.cpassword}
                        onChange={handleChange}
                        placeholder="Enter a strong password"
                        required
                        style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
                    />
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
