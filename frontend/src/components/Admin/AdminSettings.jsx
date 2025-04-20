// src/components/admin/settings/AdminSetting.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import hot-toast
import "./AdminSettings.css";

const AdminSetting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/admin/profile", {
          withCredentials: true,
        });
        const { name, email } = res.data.admin;
        setFormData((prev) => ({ ...prev, name, email }));
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        toast.error("Failed to load admin profile.");
      }
    };

    fetchAdminProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:4000/api/v1/admin/profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "" })); // Clear password field
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="admin-settings-card">
      <h2 className="admin-settings-title">Edit Admin Profile</h2>
      <form className="admin-profile-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          New Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </label>

        <button type="submit" className="admin-settings-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminSetting;
