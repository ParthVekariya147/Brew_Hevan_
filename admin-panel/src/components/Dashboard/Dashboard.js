import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { getOrders } from '../../api/api';

function Dashboard() {
  const [todayStats, setTodayStats] = useState({
    orders: 145,
    revenue: 0,
    customers: 98,
    allOrders: 0,
    recentOrders: []
  });

  const [popularItems] = useState([
    { name: 'Cappuccino', orders: 45, revenue: '$225.00' },
    { name: 'Chocolate Cake', orders: 32, revenue: '$192.00' },
    { name: 'Espresso', orders: 28, revenue: '$112.00' },
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        const ordersData = response.data?.success ? response.data.data : [];

        // Calculate total revenue
        const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);

        // Calculate total orders
        const totalOrders = ordersData.length;

        // Calculate today's orders
        const todayOrders = ordersData.filter(order => {
          const orderDate = new Date(order.createdAt).toDateString();
          const todayDate = new Date().toDateString();
          return orderDate === todayDate;
        }).length;

        // Get the last three orders
        const recentOrders = ordersData.slice(Math.max(ordersData.length - 3, 0));

        setTodayStats((prevStats) => ({
          ...prevStats,
          revenue: totalRevenue,
          orders: todayOrders,
          allOrders: totalOrders,
          recentOrders
        }));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">  
        <h2>Dashboard</h2>
        <div className="welcome-text">
          Welcome, Parth
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
                  <h6 className="text-muted">Total's Revenue</h6>
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
                  <h6 className="text-muted">Total's Customers</h6>
                  <h3>{todayStats.allOrders}</h3>
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
                  <h3>{todayStats.allOrders}</h3>
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
                    {/* <th>Order ID</th> */}
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    {/* <th>Time</th> */}
                  </tr>
                </thead>
                <tbody>
                  {todayStats.recentOrders.map(order => (
                    <tr key={order.id}>
                      {/* <td>#{order.id}</td> */}
                      <td>{order.customer}</td>
                      <td>
                        {Array.isArray(order.items) && order.items.map((item, index) => (
                          <div key={index}>
                            {item.title} (x{item.quantity})
                          </div>
                        ))}
                      </td>
                      <td>{order.total}</td>
                      {/* <td>{new Date(order.createdAt).toLocaleTimeString()}</td> */}
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