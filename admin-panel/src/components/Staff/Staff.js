import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Badge,
  Row,
  Col,
  Form,
  Modal,
} from "react-bootstrap";
import { getStaff, updateStaff, deleteStaff, post } from "../../api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Staff.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function Staff() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [currentStaff, setCurrentStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "Active",
  });

  // const adminId = "YOUR_ADMIN_ID_HERE";

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      const response = await getStaff();
      if (response && response.data) {
        setStaffMembers(response.data);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentStaff) {
        const response = await updateStaff(String(currentStaff._id), formData);
        if (response && response.data) {
          setStaffMembers((prevStaff) =>
            prevStaff.map((staff) =>
              staff._id === currentStaff._id ? response.data : staff
            )
          );
          toast.success("Staff member updated successfully!", { closeButton: false });
        }
      } else {
        const response = await post("staff", formData);
        if (response && response.data) {
          setStaffMembers((prevStaff) => [...prevStaff, response.data]);
          toast.success("Staff member added successfully!", { closeButton: false });
        }
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving staff:", error);
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }
      toast.error(error.response?.data?.message || "Error saving staff member", { closeButton: false });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await deleteStaff(id);
        setStaffMembers((prevStaff) =>
          prevStaff.filter((staff) => staff._id !== id)
        );
        toast.success("Staff member deleted successfully!", { closeButton: false });
      } catch (error) {
        console.error("Error deleting staff:", error);
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        }
        toast.error(error.response?.data?.message || "Error deleting staff member", { closeButton: false });
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStaff(null);
    setFormData({
      name: "",
      role: "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  const handleShowModal = (staff = null) => {
    if (staff) {
      setCurrentStaff(staff);
      setFormData(staff);
    }
    setShowModal(true);
  };

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRole === "All Roles" || staff.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Staff Management</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          <FaPlus className="me-2" />
          Add Staff Member
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4} xs={12}>
          <Form.Control
            type="search"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col md={3} xs={12}>
          <Form.Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option>All Roles</option>
            <option>Manager</option>
            <option>Barista</option>
            <option>Chef</option>
            <option>Waiter</option>
          </Form.Select>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={staff._id}>
                  <td>{staff.name}</td>
                  <td>{staff.role}</td>
                  <td>{staff.email}</td>
                  <td>{staff.phone}</td>
                  <td>
                    <Badge
                      bg={staff.status === "Active" ? "success" : "warning"}
                    >
                      {staff.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(staff)}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(staff._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Staff Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentStaff ? "Edit Staff Member" : "Add Staff Member"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Role</option>
                <option>Manager</option>
                <option>Barista</option>
                <option>Chef</option>
                <option>Waiter</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </Form.Select>
            </Form.Group>

            <div className="text-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentStaff ? "Update" : "Add"} Staff Member
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Staff;
