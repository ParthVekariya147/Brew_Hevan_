import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";

// Import components
import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./components/Orders/Orders";
import MenuItems from "./components/Menu/MenuItems";
import Inventory from "./components/Inventory/Inventory";
import Staff from "./components/Staff/Staff";
import Reports from "./components/Reports/Reports";
import LoginPage from "./components/login/LoginForm";
import RegisterPage from "./components/register/RegisterForm";
import ManageBookings from "./components/ManageBookings/ManageBookings";

// Create a ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <div className="sidebar">
              <Navbar bg="dark" variant="dark" className="flex-column h-100">
                <Navbar.Brand className="mb-4 px-3">
                  <h2>Cafe Admin</h2>
                </Navbar.Brand>
                <Nav className="flex-column w-100">
                  <Nav.Link as={Link} to="/">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/orders">
                    Orders
                  </Nav.Link>
                  <Nav.Link as={Link} to="/menu">
                    Menu Items
                  </Nav.Link>
                  <Nav.Link as={Link} to="/inventory">
                    Inventory
                  </Nav.Link>
                  <Nav.Link as={Link} to="/staff">
                    Staff
                  </Nav.Link>

                  <Nav.Link as={Link} to="/admin/bookings">
                    Bookings
                  </Nav.Link>
                  <Nav.Link as={Link} to="/reports">
                    Reports
                  </Nav.Link>
                </Nav>
              </Navbar>
            </div>
            <div className="main-content">
              <Navbar bg="white" className="top-bar">
                <Container fluid>
                  <Navbar.Text>Welcome, Admin</Navbar.Text>
                  <Nav>
                    <Nav.Link>Profile</Nav.Link>
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
