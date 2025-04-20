import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const { token } = useParams();
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const obj = {
        token: token,
        password: data.password,
      };
      const res = await axios.post("/user/resetpassword", obj);
      setMessage(res.data.message || "Password reset successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password.");
    }
  };

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  };

  const containerStyle = {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    marginBottom: "15px",
    width: "100%",
  };

  const buttonStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  };

  const messageStyle = {
    fontSize: "13px",
    color: message.includes("successful") ? "green" : "red",
    textAlign: "center",
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Reset Password</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <label style={labelStyle}>New Password</label>
          <input
            type="password"
            {...register("password")}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            required
            style={inputStyle}
          />

          {message && <p style={messageStyle}>{message}</p>}

          <button type="submit" style={buttonStyle}>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
