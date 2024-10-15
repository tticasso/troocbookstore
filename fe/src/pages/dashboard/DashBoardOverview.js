import React from 'react';

const DashboardOverview = () => {
  const stats = {
    users: 120,
    books: 80,
    authors: 15,
    orders: 300,
  };

  const cardStyles = "bg-blue-500 text-white p-4 rounded-lg shadow-md";

  return (
    <div className="flex gap-4">
      <div className="w-1/4">
        <div className={cardStyles}>
          <h2 className="text-lg font-bold">Users</h2>
          <p>{stats.users}</p>
        </div>
      </div>
      <div className="w-1/4">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Books</h2>
          <p>{stats.books}</p>
        </div>
      </div>
      <div className="w-1/4">
        <div className="bg-teal-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Authors</h2>
          <p>{stats.authors}</p>
        </div>
      </div>
      <div className="w-1/4">
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Orders</h2>
          <p>{stats.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
