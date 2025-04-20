import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js"; // Optional
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

// === GET ADMIN DASHBOARD STATS ===
export const getAdminStats = catchAsyncErrors(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();
  const totalApplications = await Application.countDocuments();

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalJobs,
      totalApplications,
    },
  });
});

// === GET ALL USERS ===
export const getAllUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ success: true, users });
});

// === TOGGLE USER ACTIVE/INACTIVE ===
export const updateUserStatus = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.status = user.status === "active" ? "inactive" : "active";
  await user.save();
  res.status(200).json({ message: `User ${user.status}` });
});

// === DELETE USER ===
export const deleteUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ message: "User deleted" });
});

// === GET ADMIN PROFILE ===
export const getAdminProfile = catchAsyncErrors(async (req, res) => {
  const admin = await User.findById(req.user.id).select("-password"); // assuming admins are in the User model
  if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

  res.status(200).json({ success: true, admin });
});

// === UPDATE ADMIN PROFILE ===
export const updateAdminProfile = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const admin = await User.findById(req.user.id);
  if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

  if (name) admin.name = name;
  if (email) admin.email = email;
  if (password) admin.password = password; // make sure your schema handles hashing

  await admin.save();

  res.status(200).json({ success: true, message: "Profile updated successfully" });
});
