import express from "express";
export const userRouter = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import { getMe, loginUser, registerUser } from "../controllers/userController.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getMe);
