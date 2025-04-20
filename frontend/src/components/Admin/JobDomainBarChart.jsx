
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./JobDomainBarChart.css"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobDomainBarChart = () => {
  const [domainData, setDomainData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomainStats = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/job/domain-stats");
        setDomainData(res.data.stats);
      } catch (error) {
        console.error("Error fetching domain stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDomainStats();
  }, []);

  const labels = domainData.map((item) => item.category);
  const counts = domainData.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        label: "Jobs Posted",
        data: counts,
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "📊 Jobs Distribution by Domain",
        font: { size: 22 },
        color: "#1f2937",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
        grid: { color: "#e5e7eb" },
      },
      x: {
        ticks: { color: "#374151" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h1 className="chart-title">Admin Dashboard Insights</h1>
        <p className="chart-subtitle">A breakdown of jobs posted by different domains</p>
      </div>

      {loading ? (
        <p className="chart-loading">Loading chart data...</p>
      ) : domainData.length === 0 ? (
        <p className="chart-empty">No job data available to display.</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default JobDomainBarChart;
