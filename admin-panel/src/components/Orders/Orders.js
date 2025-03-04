import React, { useState, useEffect } from "react";
import { Table, Card, Button, Badge, Modal, Form } from "react-bootstrap";
import {
  getOrders,
  createOrders,
  updateOrders,
  deleteOrders,
  getMenu,
} from "../../api/api";
import "./Orders.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaEdit, FaTrash, FaFileDownload, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    items: [],
    total: 0,
    status: "Pending",
  });
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const results = orders.filter(
      (order) =>
        (order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.phone.includes(searchQuery)) &&
        (statusFilter === "All" || order.status === statusFilter)
    );
    setFilteredOrders(results);
  }, [searchQuery, orders, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      const ordersData = response.data?.success ? response.data.data : [];
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await getMenu();
      if (response.data && response.data.success) {
        setMenuItems(response.data.data);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setMenuItems([]);
    }
  };

  const handleAdd = () => {
    setEditingOrder(null);
    setFormData({
      customer: "",
      phone: "",
      items: [],
      total: 0,
      status: "Pending",
    });
    setShowModal(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      customer: order.customer || "",
      phone: order.phone || "",
      items: Array.isArray(order.items)
        ? order.items
        : order.items.split(", ").map((item) => {
            const match = item.match(/^(.*) \(x(\d+)\)$/);
            return match
              ? { title: match[1], quantity: parseInt(match[2], 10) }
              : { title: item, quantity: 1 };
          }),
      total: order.total || 0,
      status: order.status || "Pending",
    });
    setShowModal(true);
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrders(orderId);
        setOrders(orders.filter((order) => order._id !== orderId));
        toast.success("Order deleted successfully!");
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Error deleting order");
      }
    }
  };

  const handleItemSelect = (item, quantity = 1) => {
    setFormData((prev) => {
      const existingItemIndex = prev.items.findIndex(
        (i) => i.title === item.title
      );
      let updatedItems;

      if (existingItemIndex !== -1) {
        updatedItems = prev.items.map((i, index) =>
          index === existingItemIndex
            ? {
                ...i,
                quantity: i.quantity + quantity,
                total: (i.quantity + quantity) * item.price,
              }
            : i
        );
      } else {
        updatedItems = [
          ...prev.items,
          {
            title: item.title,
            quantity,
            price: item.price,
            total: quantity * item.price,
          },
        ];
      }

      const totalPrice = updatedItems.reduce((sum, i) => sum + i.total, 0);

      return { ...prev, items: updatedItems, total: totalPrice };
    });
  };

  const handleSave = async () => {
    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    } else {
      setError("");
    }

    try {
      const selectedItems = formData.items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      }));

      const updatedFormData = {
        customer: formData.customer,
        phone: formData.phone,
        items: selectedItems,
        total: formData.total,
        status: formData.status,
      };

      if (editingOrder && editingOrder._id) {
        await updateOrders(editingOrder._id, updatedFormData);
        toast.success("Order updated successfully!");
      } else {
        await createOrders(updatedFormData);
        toast.success("Order created successfully!");
      }

      fetchOrders();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Error saving order");
    }
  };

  const handleDownloadInvoice = (order) => {
    console.log("Downloading invoice for order:", order);

    const invoiceData = {
      orderId: order._id,
      customer: order.customer,
      phone: order.phone,
      items: order.items,
      total: order.total.toFixed(2),
      status: order.status,
      date: new Date().toLocaleString(),
    };

    console.log("Invoice Data:", invoiceData);
    generateInvoicePDF(invoiceData);
  };

  const generateInvoicePDF = (invoiceData) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Brew Haven Invoice", 15, 60);

    doc.setFontSize(12);
    doc.text(`Dear ${invoiceData.customer},`, 15, 70);
    doc.text("Thank you for your order! Here are the details:", 15, 80);

    doc.text(`Invoice ID: ${invoiceData.orderId}`, 15, 90);
    doc.text(`Phone: ${invoiceData.phone}`, 15, 100);
    doc.text(`Status: ${invoiceData.status}`, 15, 110);
    doc.text(`Date: ${invoiceData.date}`, 15, 120);

    let itemsData = [];
    let subtotal = 0;

    invoiceData.items.forEach((item) => {
      const totalItemPrice = item.total;
      subtotal += totalItemPrice;

      itemsData.push([
        item.title,
        item.quantity,
        `₹${item.price.toFixed(2)}`,
        `₹${totalItemPrice.toFixed(2)}`,
      ]);
    });

    doc.autoTable({
      startY: 130,
      head: [["Item", "Quantity", "Unit Price", "Total Price"]],
      body: itemsData,
    });

    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 15, finalY);
    doc.text(`Total: ₹${invoiceData.total}`, 15, finalY + 10);

    doc.save(`invoice_${invoiceData.orderId}.pdf`);
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Orders</h2>
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-1" /> New Order
        </Button>
      </div>

      <Form className="mb-4">
        <div className="d-flex justify-content-between">
          <Form.Group controlId="search" className="me-2">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by customer... "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="statusFilter">
            <Form.Label>Status Filter</Form.Label>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </div>
      </Form>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.customer}</td>
                    <td>{order.phone}</td>
                    <td>
                      <div className="d-flex flex-wrap">
                        {Array.isArray(order.items) && order.items.length > 0
                          ? order.items.map((item, index) => (
                              <span key={index} className="me-2">
                                {item.title} (x{item.quantity})
                              </span>
                            ))
                          : "No items"}
                      </div>
                    </td>
                    <td>₹{order.total.toFixed(2)}</td>
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
                      <div className="d-flex flex-wrap justify-content-start">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2 mb-2"
                          onClick={() => handleEdit(order)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="me-2 mb-2"
                          onClick={() => handleDelete(order._id)}
                        >
                          <FaTrash className="me-1" /> Delete
                        </Button>
                        {/* <Button
                          variant="outline-Dark"
                          size="sm"
                          className="me-2 mb-2"
                          onClick={() => handleDownloadInvoice(order)}
                        >
                          <FaFileDownload className="me-1" /> Download Invoice
                        </Button> */}
                        <Button
                          variant="outline-dark"
                          style={{ border: "1px solid black" }}
                          onClick={() => handleDownloadInvoice(order)}
                        >
                          < FaFileDownload/>  Download Invoice
                        </Button>
                      </div>
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
                placeholder="Enter customer name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter phone number"
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}{" "}
            {/* Display error message */}
            <Form.Group className="mb-3">
              <Form.Label>Select Items</Form.Label>
              <div
                className="d-flex flex-column"
                style={{ maxHeight: "200px", overflowY: "scroll" }}
              >
                {menuItems.map((item) => {
                  const existingItem = formData.items.find(
                    (i) => i.title === item.title
                  );
                  const quantity = existingItem ? existingItem.quantity : 0;

                  return (
                    <div
                      key={item._id}
                      className="mb-2 d-flex align-items-center"
                    >
                      <Form.Check
                        type="checkbox"
                        label={`${item.title} - ₹${item.price.toFixed(2)}`}
                        checked={quantity > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleItemSelect(item, 1);
                          } else {
                            handleItemSelect(item, -quantity);
                          }
                        }}
                      />
                      {quantity > 0 && (
                        <Form.Control
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10);
                            if (newQuantity > 0) {
                              handleItemSelect(item, newQuantity - quantity);
                            }
                          }}
                          className="mt-1 ms-2"
                          style={{ width: "80px" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={formData.total}
                readOnly
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
