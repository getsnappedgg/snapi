const express = require("express");
const userRouter = express.Router();

const { protect, isAdmin } = require("../middleware/authMiddleware");

const {
	getMe,
	loginUser,
	registerUser,
} = require("../controllers/userController");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getMe);
module.exports = userRouter;
