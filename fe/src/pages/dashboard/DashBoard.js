import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DashboardOverview from './DashBoardOverview';
import OrderChart from './OrderChart';

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <h1>Admin Dashboard</h1>
          <DashboardOverview />
          <OrderChart />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
