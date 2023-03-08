import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { router } from "./routes/index.js";
export const prisma = new PrismaClient();
const PORT = process.env.PORT;

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/api", router);

app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}`)
);

app.use(function (err, req, res, next) {
	if (process.env.NODE_ENV !== "test") console.error(err.stack);
	res.status(err.status || 500).send(err.message || "Internal server error");
});
