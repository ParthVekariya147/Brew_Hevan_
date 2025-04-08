import React, { useState, useEffect } from "react";
import { getAllContacts } from "../../api/api"; // Import function to fetch contact data
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactForm.css";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all contact messages
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAllContacts(); // Fetch data from the backend
        setContacts(response.data); // Assuming the response contains an array of contacts
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setErrorMessage("Failed to load contact messages. Please try again later.");
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Messages</h2>

      {/* Error Message */}
      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

      {/* Table for displaying contact messages */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.message}</td>
                  <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No contact messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
