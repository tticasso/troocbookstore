import React from 'react';
import Sidebar from './Sidebar';
import DashboardOverview from './DashBoardOverview';
import OrderChart from './OrderChart';

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <DashboardOverview />
        <OrderChart />
      </div>
    </div>
  );
};

export default Dashboard;
