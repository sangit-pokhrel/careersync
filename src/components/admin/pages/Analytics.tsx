'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [metricType, setMetricType] = useState('All Metric Types');
  const [selectedWeek, setSelectedWeek] = useState('This Week');

  const chartData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Users',
        data: [504, 42, 178, 524, 474, 287, 151],
        backgroundColor: '#8B5CF6',
      },
      {
        label: 'Analytics',
        data: [250, 11, 192, 178, 30, 88, 14],
        backgroundColor: '#F97316',
      },
      {
        label: 'Support',
        data: [145, 277, 134, 184, 12, 69, 123],
        backgroundColor: '#06B6D4',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 600,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">👥</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2">Total Visitors</h3>
          <p className="text-4xl font-bold mb-2">23211</p>
          <p className="text-green-500 text-sm">+2% last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">📊</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2">Total Analytics</h3>
          <p className="text-4xl font-bold mb-2">23211</p>
          <p className="text-red-500 text-sm">-4% last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">⭐</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2">Total Rating</h3>
          <p className="text-4xl font-bold mb-2">4/5</p>
          <p className="text-green-500 text-sm">+2% last month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metric Type
            </label>
            <select 
              value={metricType}
              onChange={(e) => setMetricType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>All Metric Types</option>
              <option>Visitors</option>
              <option>Analytics</option>
              <option>Ratings</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Weekly Analytics</h2>
          <select 
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>This Week</option>
            <option>Last Week</option>
            <option>Last Month</option>
          </select>
        </div>
        <div className="h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}