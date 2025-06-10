// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const SalesChart = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [filter, setFilter] = useState('15days');

//   useEffect(() => {
//     fetch(`http://18.209.91.97:7778/api/appointments/chart?filter=${filter}`)
//       .then(response => response.json())
//       .then(data => {
//         setSalesData(data.data);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, [filter]);

//   const chartData = {
//     labels: salesData.map(item => item._id),
//     datasets: [
//       {
//         label: 'Sales',
//         data: salesData.map(item => item.totalSales),
//         borderColor: '#00D1B2',
//         backgroundColor: 'rgba(0, 209, 178, 0.2)',
//         fill: true,
//         tension: 0.4,
//         pointRadius: 5,
//         pointBackgroundColor: '#00D1B2',
//         pointHoverRadius: 8,
//         pointHoverBackgroundColor: '#ffffff',
//         borderWidth: 3,
//       },
//     ],
//   };

//   return (
//     <div className="card shadow-lg rounded-lg border-0">
//       <div className="card-body p-4">
//         {/* <h5 className="text-dark text-center mb-4">Sales Overview</h5> */}
//         <div className="d-flex justify-content-between mb-4">
//           <select value={filter} onChange={e => setFilter(e.target.value)} className="form-select w-auto">
//             <option value="15days">Last 15 Days</option>
//             <option value="2months">Last 2 Months</option>
//           </select>
//         </div>
//         <div className="chart-container" style={{ position: 'relative', height: '400px' }}>
//           <Line data={chartData} options={{ responsive: true }} />
//         </div>
//       </div>
//     </div>

//   );
// };

// export default SalesChart;



import React, { useState, useEffect } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [filter, setFilter] = useState('15days');

  useEffect(() => {
    fetch(`http://18.209.91.97:7778/api/appointments/chart?filter=${filter}`)
      .then(response => response.json())
      .then(data => {
        setSalesData(data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [filter]);

  // Convert _id to "Month Date" format (e.g., "Feb 5")
  const getMonthDate = (id) => {
    const date = new Date(id); // Ensure _id is a valid date string
    return date.toLocaleString('default', { month: 'short', day: 'numeric' }); // e.g., "Feb 5"
  };

  const chartData = {
    labels: salesData.map(item => getMonthDate(item._id)), // Show month & date
    datasets: [
      {
        label: 'Sales',
        data: salesData.map(item => item.totalSales),
        borderColor: '#00D1B2',
        backgroundColor: 'rgba(0, 209, 178, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#00D1B2',
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#ffffff',
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="card shadow-lg rounded-lg border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-4">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="form-select w-auto">
            <option value="15days">Last 15 Days</option>
            <option value="2months">Last 2 Months</option>
          </select>
        </div>
        <div className="chart-container" style={{ position: 'relative', height: '400px' }}>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
