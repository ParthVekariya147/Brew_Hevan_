import React from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Sidebar = ({ show, handleClose }) => {
  return (
    <>
      {/* Offcanvas for mobile view */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Braw Have</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav bg="dark" variant="dark" className="flex-column">
            <Nav.Link
              as={NavLink}
              to="/"
              exact
              activeClassName="active-link"
              onClick={handleClose}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/orders"
              activeClassName="active-link"
              onClick={handleClose}
            >
              Orders
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/menu"
              activeClassName="active-link"
              onClick={handleClose}
            >
              Menu Items
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/inventory"
              activeClassName="active-link"
              onClick={handleClose}
            >
              Inventory
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/staff"
              activeClassName="active-link"
              onClick={handleClose}
            >
              Staff
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/admin/bookings"
              activeClassName="active-link"
              onClick={handleClose}
            >
              Bookings
            </Nav.Link>
            {/* <Nav.Link
              as={NavLink}
              to="/reports"
              activeClassName="active-link"
              onClick={handleClose}
            >
              Reports
            </Nav.Link> */}
            <Nav.Link
              as={NavLink}
              to="/upload-images"
              activeClassName="active-link"
              onClick={handleClose}
            >
              Upload Images
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/invoice" onClick={handleClose}>
              Invoice
            </Nav.Link> */}
            <Nav.Link
              as={NavLink}
              to="/contact"
              activeClassName="active-link"
              onClick={handleClose}
            >
              Contact Us
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Always visible sidebar for desktop view */}
      <div className="d-none d-md-block sidebar">
        <Navbar bg="dark" variant="dark" className="flex-column h-100">
          <Navbar.Brand className="mb-4 px-3">
            <h2>Brew Haven</h2>
          </Navbar.Brand>
          <Nav className="flex-column w-100">
            <Nav.Link as={NavLink} to="/" exact activeClassName="active-link">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/orders" activeClassName="active-link">
              Orders
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menu" activeClassName="active-link">
              Menu Items
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/inventory"
              activeClassName="active-link"
            >
              Inventory
            </Nav.Link>
            <Nav.Link as={NavLink} to="/staff" activeClassName="active-link">
              Staff
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/admin/bookings"
              activeClassName="active-link"
            >
              Bookings
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/reports" activeClassName="active-link">
              Reports
            </Nav.Link> */}
            <Nav.Link
              as={NavLink}
              to="/upload-images"
              activeClassName="active-link"
            >
              Upload Images
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              activeClassName="active-link"
            >
              Contact Us
            </Nav.Link>

            {/* <Nav.Link as={Link} to="/invoice">
              Invoice
            </Nav.Link> */}
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default Sidebar;
