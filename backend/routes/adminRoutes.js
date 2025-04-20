import express from 'express';  
import { getAdminStats, getAllUsers, updateUserStatus, deleteUser, getAdminProfile, updateAdminProfile } from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";  

const router = express.Router();  

router.get("/stats", isAuthenticated, getAdminStats);   
router.get("/users", isAuthenticated, getAllUsers);
router.get("/profile", isAuthenticated, getAdminProfile);
router.put("/profile", isAuthenticated, updateAdminProfile);
router.put("/users/:id/status", isAuthenticated, updateUserStatus);
router.delete("/users/:id", isAuthenticated, deleteUser);

export default router;
