import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const DashboardOverview = () => {
  const stats = {
    users: 120,
    books: 80,
    authors: 15,
    orders: 300,
  };

  return (
    <Row>
      <Col md={3}>
        <Card bg="primary" text="white" className="mb-3">
          <Card.Body>
            <Card.Title>Users</Card.Title>
            <Card.Text>{stats.users}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg="success" text="white" className="mb-3">
          <Card.Body>
            <Card.Title>Books</Card.Title>
            <Card.Text>{stats.books}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg="info" text="white" className="mb-3">
          <Card.Body>
            <Card.Title>Authors</Card.Title>
            <Card.Text>{stats.authors}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg="warning" text="white" className="mb-3">
          <Card.Body>
            <Card.Title>Orders</Card.Title>
            <Card.Text>{stats.orders}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardOverview;
