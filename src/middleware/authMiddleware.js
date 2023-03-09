const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const prisma = require("../index");

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from the token
			req.user = await prisma.user.findUnique({
				where: { id: decoded.id },
			});
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized");
		}
	}
});

const isAdmin = asyncHandler(async (req, res, next) => {
	try {
		if (req.user.role != "ADMIN") {
			res.status(401);
			throw new Error("Not authorized");
		}
		next();
	} catch (error) {
		res.status(401);
		throw new Error("Not authorized");
	}
});

module.exports = { protect, isAdmin };
