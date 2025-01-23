import React, { useState, useEffect } from "react";
import { Table, Card, Button, Badge, Modal, Form } from "react-bootstrap";
import {
  getOrders,
  createOrders,
  updateOrders,
  deleteOrders,
} from "../../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    customer: "",
    items: "",
    total: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders(); // Assuming getOrders fetches the API data
      console.log("Fetched Orders:", response);

      // Access the nested data
      const ordersData =
        response.data && response.data.success ? response.data.data : [];
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAdd = () => {
    setEditingOrder(null);
    setFormData({
      customer: "",
      items: "",
      total: "",
      status: "Pending",
    });
    setShowModal(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order); // Ensure order contains _id
    setFormData({
      customer: order.customer || "",
      items: order.items || "",
      total: order.total || "",
      status: order.status || "Pending",
    });
    setShowModal(true);
  };

  const handleDelete = async (orderId) => {
    console.log("Deleting Order ID:", orderId); // Debugging log
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrders(orderId);
        setOrders(orders.filter((order) => order._id !== orderId)); // Make sure _id matches
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingOrder && editingOrder._id) {
        // Use _id field for updating
        await updateOrders(editingOrder._id, formData);
      } else {
        // Create a new order
        await createOrders(formData);
      }
      fetchOrders(); // Refresh the list
      setShowModal(false);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Orders</h2>
        <Button variant="primary" onClick={handleAdd}>
          New Order
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                {/* <th>Order ID</th> */}
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    {/* <td>#{order._id}</td> */}
                    <td>{order.customer}</td>
                    <td>{order.items}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <Badge
                        bg={
                          order.status === "Completed"
                            ? "success"
                            : order.status === "Pending"
                            ? "warning"
                            : "info"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(order)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(order._id)} // Make sure _id is passed
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No orders available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingOrder ? "Edit Order" : "New Order"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.customer}
                onChange={(e) =>
                  setFormData({ ...formData, customer: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Items</Form.Label>
              <Form.Control
                type="number"
                value={formData.items}
                onChange={(e) =>
                  setFormData({ ...formData, items: parseInt(e.target.value) })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={formData.total}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total: parseFloat(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Orders;
