import React, { useState } from 'react';
import SubHeading from '../SubHeading/SubHeading';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (email && email.endsWith('@gmail.com')) {
      const subscribedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
      
      if (subscribedEmails.includes(email)) {
        setMessage('You are already subscribed!');
        setMessageType('error');
      } else {
        subscribedEmails.push(email);
        localStorage.setItem('subscribedEmails', JSON.stringify(subscribedEmails));
        setMessage('Subscription successful!');
        setMessageType('success');
      }
      
      setEmail(''); // Clear input field after submission
    } else {
      setMessage('Please enter a valid Email address.');
      setMessageType('error');
    }
  };

  return (
    <div className="app__newsletter">
      <div className="app__newsletter-heading">
        <SubHeading title="Newsletter" />
        <h1 className="headtext__cormorant">Subscribe To Our Newsletter</h1>
        <p className="p__opensans">And never miss latest Updates!</p>
      </div>
      <div className="app__newsletter-input flex__center">
        <input 
          type="email" 
          placeholder="Enter your email address" 
          value={email} 
          onChange={handleInputChange}
        />
        <button 
          type="button" 
          className="custom__button" 
          onClick={handleSubmit}
        >
          Subscribe
        </button>
      </div>
      {message && <p className={`newsletter__message ${messageType}`}>{message}</p>}
    </div>
  );
};

export default Newsletter;
