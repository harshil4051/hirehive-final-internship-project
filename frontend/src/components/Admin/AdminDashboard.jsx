// src/components/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import JobDomainBarChart from "./JobDomainBarChart";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    usersCount: 0,
    jobsCount: 0,
    applicationsCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/admin/stats", {
          withCredentials: true
        });
        

        const { totalUsers, totalJobs, totalApplications } = response.data.stats;

        setStats({
          usersCount: totalUsers,
          jobsCount: totalJobs,
          applicationsCount: totalApplications,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-heading">Admin Dashboard</h1>
      <p className="admin-subheading">Welcome back, Admin!</p>

      <div className="admin-cards">
        <div className="admin-card">
          <h2>Total Users</h2>
          <p>{stats.usersCount}</p>
        </div>
        <div className="admin-card">
          <h2>Total Jobs</h2>
          <p>{stats.jobsCount}</p>
        </div>
        <div className="admin-card">
          <h2>Applications</h2>
          <p>{stats.applicationsCount}</p>
        </div>
      </div>

      <div className="admin-chart-placeholder">
        <h2>Analytics Overview</h2>
        {/* <JobDomainBarChart /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
