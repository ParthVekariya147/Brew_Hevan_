import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";

import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./components/Orders/Orders";
import MenuItems from "./components/Menu/MenuItems";
import Inventory from "./components/Inventory/Inventory";
import Staff from "./components/Staff/Staff"
import Reports from "./components/Reports/Reports";
import LoginPage from "./components/login/LoginForm";
import RegisterPage from "./components/register/RegisterForm";
import ManageBookings from "./components/ManageBookings/ManageBookings";
import Sidebar from "./components/Sidbar/Sidebar";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Contact from "./components/Contact/Contact";
// import { ContactTable } from "./components/Contact/Contact";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const { isLoggedIn, logout } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Sidebar show={showSidebar} handleClose={handleClose} />
            <div className="main-content">
              <Navbar bg="white" className="top-bar">
                <Container fluid>
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="d-md-none"
                  >
                    Toggle Sidebar
                  </Button>
                  <Navbar.Text>Welcome, Parth</Navbar.Text>
                  <Nav>
                    {/* <Nav.Link>Profile</Nav.Link> */}
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
              <Container fluid className="content-area">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/invoice"
                    element={
                      <ProtectedRoute>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/menu"
                    element={
                      <ProtectedRoute>
                        <MenuItems />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/inventory"
                    element={
                      <ProtectedRoute>
                        <Inventory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/staff"
                    element={
                      <ProtectedRoute>
                        <Staff />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/bookings"
                    element={
                      <ProtectedRoute>
                        <ManageBookings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/upload-images"
                    element={
                      <ProtectedRoute>
                        <ImageUpload />
                      </ProtectedRoute>
                    }
                  />
                      <Route
                    path="/contact"
                    element={
                      <ProtectedRoute>
                        <Contact />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Container>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
