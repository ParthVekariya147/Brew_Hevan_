import React, { useState, useEffect } from "react";
import { Table, Card, Button,  Form, Modal } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./inventory.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    cost_price: "",
    selling_price: "",
  });
  const [currentItem, setCurrentItem] = useState(null);
  // const [, setSearchText] = useState("");
  // const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getinventory");
        console.log("Fetched inventory items:", response.data); 
        setInventoryItems(response.data);
      } catch (error) {
      }
    };

    fetchInventoryItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await axios.put(
          `http://localhost:4000/inventory/${currentItem._id}`,
          formData
        );
        toast.success("Inventory item updated successfully!");
      } else {
        await axios.post("http://localhost:4000/addinventory", formData);
        toast.success("Inventory item added successfully!");
      }
      const response = await axios.get("http://localhost:4000/getinventory");
      setInventoryItems(response.data);
      handleCloseModal();
    } catch (error) {
      toast.info("Error adding/updating inventory item.");
    }
  };

  const handleShowModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData(item);
    } else {
      setCurrentItem(null);
      setFormData({
        name: "",
        category: "",
        quantity: "",
        unit: "",
        cost_price: "",
        selling_price: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentItem(null);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      cost_price: "",
      selling_price: "",
    });
  };

  const handleDelete = async (id) => {
    console.log("Deleting item with ID:", id); // Debugging
    try {
      await axios.delete(`http://localhost:4000/inventory/${id}`);
      toast.success("Inventory item deleted successfully!");
      setInventoryItems(inventoryItems.filter(item => item._id !== id));
    } catch (error) {
      toast.error("Error deleting inventory item.");
      console.error("Error deleting inventory item:", error);
    }
  };
  

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          <FaPlus className="me-2" />
          Add Item
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.cost_price}</td>
                  <td>{item.selling_price}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(item)}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
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

      {/* Add/Edit Inventory Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentItem ? "Edit Inventory Item" : "Add Inventory Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cost Price</Form.Label>
              <Form.Control
                type="number"
                name="cost_price"
                value={formData.cost_price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                name="selling_price"
                value={formData.selling_price}
                onChange={handleInputChange}
                required
              />
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
                {currentItem ? "Update" : "Add"} Inventory Item
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Inventory;
