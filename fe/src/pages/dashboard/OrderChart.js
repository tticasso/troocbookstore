import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './OrderChart.css'; // Keep custom CSS for chart

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const OrderChart = () => {
  return (
    <div className="mt-5">
      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white text-center p-4">
          <h4 className="text-lg font-semibold">Order Statistics</h4>
        </div>
        <div className="p-4" style={{ height: '400px' }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OrderChart;
