import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Logged in user:", data.user); // ✅ Debug log
      toast.success(`Welcome, ${data.user.role}`); // ✅ Toast based on role

      // Save user in context
      setUser(data.user);
      setIsAuthorized(true);

      // Role-based redirection
      const userRole = data.user.role.toLowerCase();

      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "employer") {
        navigate("/job/post");
      } else if (userRole === "job seeker") {
        navigate("/applications/me");
      } else {
        navigate("/");
      }

      // Reset fields
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setIsAuthorized(false);
    }
  };

  // // Optional: redirect already logged-in user
  // if (isAuthorized) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                  <option value="Admin">Admin</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <div>
              <a href="/forgotpassword" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
