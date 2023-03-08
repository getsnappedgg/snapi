import asyncHandler from "express-async-handler";
import { prisma } from "../index.js";

export const getDecks = asyncHandler(async (req, res) => {
	const decks = await prisma.deck.findMany({
		include: {
			cards: true,
		},
	}); // needs a limit
	res.json(decks);
});
export const getSingleDeck = asyncHandler(
	async (req, res, next) => {
		try {
			let { deckId } = req.params;
			deckId = parseInt(deckId);
			const deck = await prisma.deck.findUnique({
				where: {
					id: deckId,
				},
				include: {
					cards: true,
				},
			});
			if (!deck) {
				throw new Error("can't find deck");
			} else {
				res.status(200).json(deck);
			}
		} catch (error) {
			console.error(error);
			next();
		}
	}
);
export const createDeck = asyncHandler(async (req, res) => {
	let { name, cardIds, userId } = req.body;
	try {
		if (cardIds.length != 12) {
			throw Error("Deck is not full");
		}

		cardIds = cardIds.map((id) => ({ id }));
		const deck = await prisma.deck.create({
			data: {
				userId,
				name,
				cards: {
					connect: cardIds,
				},
			},
		});
		res.status(200).json(deck);
	} catch (error) {
		console.log(error);
	}
});

export const deleteDeck = asyncHandler(async (req, res) => {
	try {
		const { id } = req.body;
		const deletedDeck = await prisma.deck.delete({
			where: {
				id,
			},
		});
		// const deletedIds = await prisma.cardsOnDecks.deleteMany({
		// 	where: {
		// 		deckId: id,
		// 	},
		// });
		// console.log(deletedIds);
		// res.status(200).json(deletedDeck);
	} catch (error) {
		console.error(error);
	}
});
export const editDeck = asyncHandler(async (req, res) => {
	const { id, cards } = req.body;
	if (cards.length != 12) throw new Error("deck length invalid");
	// const updatedDeck = prisma.cardsOnDecks.
});
export const getDecksByCardId = asyncHandler(async (req, res) => {
	try {
		const cardId = parseInt(req.params.cardId);
		let decksByCardId = await prisma.deck.findMany({
			where: {
				cards: {
					some: {
						id: cardId,
					},
				},
			},
			include: {
				cards: {
					include: {
						keywords: {
							select: {
								keywordId: true,
							},
						},
					},
				},
			},
		});
		if (!decksByCardId.length) throw new Error("no decks found");
		const decks = [];
		decksByCardId.forEach(deck => {
			const newDeck = {
				id: deck.id,
				name: deck.name,
				userId: deck.userId,
			};
			const cardList = deck.cards.map(card => {
				const { id, name, power, description, sourceId, keywords } = card;
				return {
					id,
					name,
					power,
					description,
					source: sourceId,
					keywords,
				};
			});
			newDeck.cardList = cardList;
			decks.push(newDeck);
		});

		res.status(200).send(decks);
	} catch (error) {
		console.log(error);
	}
});
