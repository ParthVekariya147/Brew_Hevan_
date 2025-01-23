import React from 'react';
import { Table, Card, Button, Badge } from 'react-bootstrap';

function Inventory() {
  const inventory = [
    { id: 1, item: 'Coffee Beans', quantity: 50, unit: 'kg', status: 'In Stock' },
    { id: 2, item: 'Milk', quantity: 10, unit: 'L', status: 'Low Stock' },
    { id: 3, item: 'Sugar', quantity: 25, unit: 'kg', status: 'In Stock' },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory</h2>
        <Button variant="primary">Add Item</Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>
                    <Badge bg={item.status === 'In Stock' ? 'success' : 'warning'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">Update</Button>
                    <Button variant="outline-danger" size="sm">Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default Inventory; 