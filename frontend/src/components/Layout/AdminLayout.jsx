// src/components/Layout/AdminLayout.jsx
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { setIsAuthorized, setUser } = useContext(Context);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });

      setIsAuthorized(false);
      setUser(null);
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className="admin-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/ManageUsers" className="admin-link">
            Manage Users
          </NavLink>
          <NavLink to="/admin/JobDomainBarChart" className="admin-link">
            📊 Charts
          </NavLink>
          <NavLink to="/admin/AdminSettings" className="admin-link">
            Settings
          </NavLink>
          <button className="admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
        
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
