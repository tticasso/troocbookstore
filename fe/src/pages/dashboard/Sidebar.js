import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 h-full flex flex-col">
      <nav className="flex flex-col p-3 space-y-4">
        <a href="/dashboard" className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <i className="bi bi-speedometer2"></i>
          <span>Dashboard</span>
        </a>
        <a href="/users" className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <i className="bi bi-people"></i>
          <span>User Management</span>
        </a>
        <a href="/orders" className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <i className="bi bi-bag-check"></i>
          <span>Order Management</span>
        </a>
        <a href="/books" className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <i className="bi bi-book"></i>
          <span>Book Management</span>
        </a>
        <a href="/authors" className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <i className="bi bi-person-lines-fill"></i>
          <span>Author Management</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
