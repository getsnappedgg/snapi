import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	// Check if user exists
	const userExists = await prisma.user.findUnique({
		where: { email },
	});

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash password
	const passSalt = 10;
	const salt = await bcrypt.genSalt(passSalt);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	if (user) {
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await prisma.user.findUnique({ where: { email } });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

export const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const deletedUser = await prisma.user.delete({
		where: {
			id,
		},
	});
	res.send(200).json(deletedUser);
});

export const getMe = asyncHandler(async (req, res) => {
	// res.send(await prisma.user.findUnique.findByToken(req.headers.authorization));
	const data = {
		name: req.user.name,
		email: req.user.email,
	};
	res.status(200).json(data);
});

const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

// module.exports = {
// 	registerUser,
// 	loginUser,
// 	getMe,
// 	deleteUser,
// };
