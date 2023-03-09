const express = require("express");
const cardRouter = express.Router();
// const s3 = require("../lib/s3.js";

const { protect, isAdmin } = require("../middleware/authMiddleware");
// const { fetchRedisCardList } = require("../middleware/redisMiddleware";

const {
	createCard,
	deleteCard,
	getCards,
	getUniqueCard,
	updateCard,
} = require("../controllers/cardController");

cardRouter.get("/", getCards);
// cardRouter.get("/", fetchRedisCardList, getCards);
cardRouter.get("/:name", getUniqueCard);
cardRouter.post("/new", protect, isAdmin, createCard);
cardRouter.delete("/delete", protect, isAdmin, deleteCard);
cardRouter.put("/update", protect, isAdmin, updateCard);

module.exports = cardRouter;
