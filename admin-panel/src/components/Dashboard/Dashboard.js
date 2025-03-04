import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  
  const [todayStats, setTodayStats] = useState({
    orders: 145,
    revenue: 2854,
    customers: 98
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, customer: 'John Doe', items: 3, total: '$42.50', time: '10 mins ago' },
    { id: 2, customer: 'Sarah Smith', items: 2, total: '$25.00', time: '25 mins ago' },
    { id: 3, customer: 'Mike Johnson', items: 4, total: '$68.75', time: '45 mins ago' },
  ]);

  const [popularItems, setPopularItems] = useState([
    { name: 'Cappuccino', orders: 45, revenue: '$225.00' },
    { name: 'Chocolate Cake', orders: 32, revenue: '$192.00' },
    { name: 'Espresso', orders: 28, revenue: '$112.00' },
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };



  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <div className="welcome-text">
          Welcome, Admin
        </div>
      </div>
      
      <Row>
        <Col xs={12} md={6} lg={3}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Today's Orders</h6>
                  <h3>{todayStats.orders}</h3>
                </div>
                <div className="fs-1 text-primary">📋</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Today's Revenue</h6>
                  <h3>{formatCurrency(todayStats.revenue)}</h3>
                </div>
                <div className="fs-1 text-success">💰</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Today's Customers</h6>
                  <h3>{todayStats.customers}</h3>
                </div>
                <div className="fs-1 text-info">👥</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">All Orders</h6>
                  <h3>48</h3>
                </div>
                <div className="fs-1 text-warning">🍽️</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5>Recent Orders</h5>
              </div>
              <Table hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.items}</td>
                      <td>{order.total}</td>
                      <td>{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-4">Popular Items</h5>
              <Table hover>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {popularItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.orders}</td>
                      <td>{item.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;