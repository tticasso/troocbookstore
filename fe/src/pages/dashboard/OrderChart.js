import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './OrderChart.css'; // File CSS tuỳ chỉnh của bạn

// Đăng ký các thành phần của Chart.js
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
      tension: 0.1, // Làm cho biểu đồ mượt mà hơn
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Để cho biểu đồ co giãn với thẻ chứa nó
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const OrderChart = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center">
              <h4>Order Statistics</h4>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '400px' }}>
                <Line data={data} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderChart;
