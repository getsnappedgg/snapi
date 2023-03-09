const express = require("express");
const {
	createDeck,
	deleteDeck,
	editDeck,
	getDecks,
	getDecksByCardId,
	getSingleDeck,
} = require("../controllers/deckController");
const deckRouter = express.Router();

const { protect, isAdmin } = require("../middleware/authMiddleware");

deckRouter.route("/").post(protect, createDeck).get(getDecks);

deckRouter.route("/:deckId").get(getSingleDeck).delete(deleteDeck);
deckRouter.route("/card/:cardId").get(getDecksByCardId);
deckRouter.route("/edit").post(protect, editDeck);

module.exports = deckRouter;
