import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./manageuser.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/admin/users", {
        withCredentials: true,
      });
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const applyFilters = () => {
    let filtered = users;
    if (roleFilter) filtered = filtered.filter(user => user.role === roleFilter);
    if (statusFilter) filtered = filtered.filter(user => user.status === statusFilter);
    setFilteredUsers(filtered);
  };

  const toggleStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/admin/users/${id}/status`,
        {},
        { withCredentials: true }
      );
      toast.success(response.data.message || "User status updated");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/admin/users/${id}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [roleFilter, statusFilter, users]);

  return (
    <div className="manage-users-container">
      <h2 className="title">Manage Users</h2>

      <div className="filters">
      <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="Job Seeker">Job Seeker</option>
          <option value="Employer">Employer</option>
          <option value="Admin">Admin</option>
      </select>


        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className={user.status === "active" ? "active" : "inactive"}>
                {user.status}
              </td>
              <td>{user.phone || "N/A"}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="status-toggle"
                    onClick={() => toggleStatus(user._id)}
                  >
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className="danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
