import React from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

function Reports() {
  const reports = [
    {
      id: 1,
      title: 'Sales Report',
      description: 'Daily sales overview and analysis',
      lastGenerated: '2024-03-20',
      type: 'Financial'
    },
    {
      id: 2,
      title: 'Inventory Status',
      description: 'Current stock levels and requirements',
      lastGenerated: '2024-03-19',
      type: 'Inventory'
    },
    {
      id: 3,
      title: 'Staff Performance',
      description: 'Employee productivity metrics',
      lastGenerated: '2024-03-18',
      type: 'HR'
    }
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reports</h2>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Control type="search" placeholder="Search reports..." />
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>All Types</option>
            <option>Financial</option>
            <option>Inventory</option>
            <option>HR</option>
            <option>Sales</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Custom Range</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {reports.map(report => (
          <Col md={4} key={report.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{report.title}</Card.Title>
                <Card.Text>
                  {report.description}<br />
                  <small className="text-muted">
                    Type: {report.type}<br />
                    Last Generated: {report.lastGenerated}
                  </small>
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button variant="primary" size="sm">Generate Report</Button>
                  <Button variant="outline-secondary" size="sm">Download PDF</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <h4>Custom Report Generator</h4>
          <Row className="mt-3">
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Report Type</Form.Label>
                <Form.Select>
                  <option>Sales Analysis</option>
                  <option>Inventory Status</option>
                  <option>Staff Performance</option>
                  <option>Financial Summary</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Date Range</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Format</Form.Label>
                <Form.Select>
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary">Generate Custom Report</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Reports; 