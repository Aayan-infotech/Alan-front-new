import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  // Fake sales data
  const data = {
    labels: ['2025-02-01', '2025-02-02', '2025-02-03', '2025-02-04', '2025-02-05'],
    datasets: [
      {
        label: 'Sales',
        data: [500, 700, 800, 650, 900],
        borderColor: '#00D1B2',  // Main color for the line
        backgroundColor: 'rgba(0, 209, 178, 0.2)', // Light background color for the line area
        fill: true,
        tension: 0.4,  // Smooth curve on the line
        pointRadius: 5, // Points visible on the line
        pointBackgroundColor: '#00D1B2', // Point color
        pointHoverRadius: 8, // Point hover size
        pointHoverBackgroundColor: '#ffffff', // Point hover background color
        borderWidth: 3,  // Thicker line for better visibility
      },
    ]
  };

  // Chart.js options for a more polished look
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
            weight: '600',
          },
          color: '#2B2B2B'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 16,
          family: "'Roboto', sans-serif",
          weight: '600',
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
          },
          color: '#2B2B2B',
        },
      },
      y: {
        grid: {
          borderColor: '#E0E0E0',
          borderWidth: 1,
          color: '#f2f2f2', // Lighter grid lines
        },
        ticks: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
          },
          color: '#2B2B2B',
          callback: function (value) {
            return `$${value}`;
          },
        },
      }
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div className="card shadow-lg rounded-lg">
      <div className="card-header border-0 bg-light">
        <h5 className="text-center text-dark">Sales Overview</h5>
      </div>
      <div className="card-body p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;
