import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GET LOGGED-IN USER
router.get("/me", protect, getMe);

// UPDATE PROFILE
router.put("/me", protect, updateProfile);

export default router;