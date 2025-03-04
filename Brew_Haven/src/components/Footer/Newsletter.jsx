import React, { useState } from "react";
import SubHeading from "../SubHeading/SubHeading";
import { subscribe } from "../../api"
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email || !email.endsWith("@gmail.com")) {
      setMessage("Please enter a valid Email address.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
      setMessageType(response.ok ? "success" : "error");
      if (response.ok) setEmail("");
    } catch (error) {
      setMessage("Server error. Please try again later.");
      setMessageType("error");
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
        <button type="button" className="custom__button" onClick={handleSubmit}>
          Subscribe
        </button>
      </div>
      {message && (
        <p className={`newsletter__message ${messageType}`}>{message}</p>
      )}
    </div>
  );
};

export default Newsletter;
