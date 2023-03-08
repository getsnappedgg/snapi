import express from "express";
import { cardRouter } from "./cards.js";
import { deckRouter } from "./decks.js";
import { userRouter } from "./users.js";

export const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

router.use("/cards", cardRouter);
router.use("/users", userRouter);
router.use("/decks", deckRouter);
