import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async () => {
        try {
            const response = await fetch("http://localhost:4000/user/forgotpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("Error sending reset link.");
        }
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
    };

    const formStyle = {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    };

    const inputStyle = {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "14px",
    };

    const buttonStyle = {
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        fontSize: "14px",
        cursor: "pointer",
    };

    const messageStyle = {
        fontSize: "13px",
        color: "green",
        textAlign: "center",
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Forgot Password</h2>
                <p style={{ textAlign: "center", marginBottom: "20px" }}>
                    Enter your email to receive a password reset link.
                </p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
                <button onClick={handleForgotPassword} style={buttonStyle}>
                    Send Reset Link
                </button>
                {message && <p style={messageStyle}>{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
