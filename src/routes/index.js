const express = require("express");
const cardRouter = require("./cards");
const deckRouter = require("./decks");
const userRouter = require("./users");

const router = express.Router();

router.use("/cards", cardRouter);
router.use("/users", userRouter);
router.use("/decks", deckRouter);

module.exports = router;
