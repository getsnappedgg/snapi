import express from "express";
export const cardRouter = express.Router();
// import s3 from "../lib/s3.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";
// import { fetchRedisCardList } from "../middleware/redisMiddleware";

import {
	createCard,
	deleteCard,
	getCards,
	getUniqueCard,
	updateCard,
} from "../controllers/cardController.js";

cardRouter.get("/", getCards);
// cardRouter.get("/", fetchRedisCardList, getCards);
cardRouter.get("/:name", getUniqueCard);
cardRouter.post("/new", protect, isAdmin, createCard);
cardRouter.delete("/delete", protect, isAdmin, deleteCard);
cardRouter.put("/update", protect, isAdmin, updateCard);
