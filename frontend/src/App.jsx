import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLayout from "./components/Layout/AdminLayout";
import ManageUsers from "./components/Admin/ManageUsers";
import AdminSettings from "./components/Admin/AdminSettings";
import JobDomainBarChart from "./components/Admin/JobDomainBarChart";

import Charts from "./components/Admin/Charts";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        {/* Only show Navbar and Footer on public/user routes */}
        {!window.location.pathname.startsWith("/admin") && (
          <>
            <Navbar />
          </>
        )}

        <Routes>
          {/* Public / User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />

          {/* Admin Routes (without Navbar and Footer) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="ManageUsers" element={<ManageUsers />} />
            <Route path="Charts" element={<Charts />} />
            <Route path="AdminSettings" element={<AdminSettings />} />
            <Route path="JobDomainBarChart" element={<JobDomainBarChart />} />
            {/* More admin routes here */}
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Only show Footer on public/user routes */}
        {!window.location.pathname.startsWith("/admin") && <Footer />}

        {/* <Toaster /> */}
      <Toaster 
        position="top-right"       // Position of the toast
        reverseOrder={false}       // Whether to reverse the order of toast notifications
        toastOptions={{
        duration: 3000,           // Toast will disappear after 3 seconds
          style: {
            background: "#333",     // Background color of the toast
            color: "#fff",          // Text color
            fontWeight: "bold",     // Font weight of the text
          },
        }} 
      />

      </BrowserRouter>
    </>
  );
};

export default App;
