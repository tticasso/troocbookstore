import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column bg-dark">
      <Nav className="flex-column p-3">
        <Nav.Item>
          <Nav.Link href="/dashboard" className="text-white">
            <i className="bi bi-speedometer2"></i> Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/users" className="text-white">
            <i className="bi bi-people"></i> User Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/orders" className="text-white">
            <i className="bi bi-bag-check"></i> Order Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/books" className="text-white">
            <i className="bi bi-book"></i> Book Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/authors" className="text-white">
            <i className="bi bi-person-lines-fill"></i> Author Management
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
