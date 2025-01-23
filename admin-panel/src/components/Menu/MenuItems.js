import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Modal, Table, Card } from "react-bootstrap";
import {
  getMenu,
  updateMenu,
  deleteMenu,
  createMenu,
} from "../../api/api";
import "./MenuItems.css"; // Ensure to import the CSS file

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    price: "",
    category: "",
    status: "available",
  });
  const [currentMenu, setCurrentMenu] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const response = await getMenu();
    setMenuItems(response.data.data);
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
      if (currentMenu) {
        // Update existing menu item
        await updateMenu(currentMenu._id, formData);
      } else {
        // Create new menu item
        await createMenu(formData);
      }
      fetchMenuItems();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert(error.response?.data?.message || "Error saving menu item");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentMenu(null);
    setFormData({
      title: "",
      tag: "",
      price: "",
      category: "",
      status: "available",
    });
  };

  const handleShowModal = (menu = null) => {
    if (menu) {
      setCurrentMenu(menu);
      setFormData(menu);
    }
    setShowModal(true);
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearchText = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory = filterCategory
      ? item.category.toLowerCase() === filterCategory.toLowerCase()
      : true;
    const matchesStatus = filterStatus
      ? item.status.toLowerCase() === filterStatus.toLowerCase()
      : true;
    return matchesSearchText && matchesCategory && matchesStatus;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Menu Management</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add Menu Item
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search by name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option>wines</option>
                <option>cocktails</option>
                <option>Hotcoffee</option>
                <option>Coldcoffee</option>
                <option>pizzas</option>
                <option>burgers</option>
                <option>sandwiches</option>
                <option>frenchFries</option>
                <option>Chinese</option>
                <option>Cakes</option>
                <option>IceCreams</option> {/* Updated */}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option>Available</option>
                <option>Unavailable</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Tag</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenuItems.map((menu) => (
                <tr key={menu._id}>
                  <td>{menu.title}</td>
                  <td>{menu.tag}</td>
                  <td>{menu.price}</td>
                  <td>{menu.category}</td>
                  <td>{menu.status}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(menu)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        deleteMenu(menu._id).then(() => fetchMenuItems())
                      }
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Menu Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentMenu ? "Edit Menu Item" : "Add Menu Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option>wines</option>
                <option>cocktails</option>
                <option>Hotcoffee</option>
                <option>Coldcoffee</option>
                <option>pizzas</option>
                <option>burgers</option>
                <option>sandwiches</option>
                <option>frenchFries</option>
                <option>Chinese</option>
                <option>Cakes</option>
                <option>IceCreams</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option>Available</option>
                <option>Unavailable</option>
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
                {currentMenu ? "Update" : "Add"} Menu Item
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MenuItems;
