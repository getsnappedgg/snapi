const asyncHandler = require("express-async-handler");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const s3 = require("../lib/s3");

// @desc    Get cards
// @route   GET /api/cards
// @access  Private
const getCards = asyncHandler(async (req, res) => {
	try {
		const cards = await prisma.card.findMany({});
		const cardsWithImages = cards.map(card => {
			const compressedName = card.name
				.replace(/\b[a-z]/g, char => char.toUpperCase())
				.replace(/[^a-zA-Z0-9]/g, "")
				.replace(/'/g, "");
			let imageLink = "";
			if (process.env.NODE_ENV == "production") {
				imageLink =
					"https://prod-getsnapped-images.s3.amazonaws.com/cards/" +
					`${compressedName}` +
					`.webp`;
			} else {
				imageLink =
					"https://dev-getsnapped-images.s3.amazonaws.com/cards/" +
					`${compressedName}` +
					`.webp`;
			}

			const cardWithImage = {
				...card,
				imageLink,
			};
			return cardWithImage;
		});
		res.status(200).send(cardsWithImages);
	} catch (error) {
		console.error(error);
	}
});

const getUniqueCard = asyncHandler(async (req, res) => {
	try {
		const { name } = req.params;
		let card = await prisma.card.findUnique({
			where: {
				name,
			},
		});
		if (!card) {
			throw new Error(`Card with name ${name} not found`);
		}
		const { s3Key, s3Bucket } = card;
		// Retrieve the image from S3
		// const image = await s3
		// 	.getObject({
		// 		Bucket: s3Bucket,
		// 		Key: s3Key,
		// 	})
		// 	.promise();

		/* AbsorbingMan.webp */

		const compressedName = card.name
			.replace(/\b[a-z]/g, char => char.toUpperCase())
			.replace(/[^a-zA-Z0-9]/g, "")
			.replace(/'/g, "");

		const imageLink =
			"https://prod-getsnapped-images.s3.amazonaws.com/cards/" +
			`${compressedName}` +
			`.webp`;

		const cardWithImage = {
			...card,
			imageLink,
		};
		console.log(cardWithImage);
		res.status(200).json(cardWithImage);
	} catch (error) {
		console.error(error);
	}
});

// @desc    Create cards
// @route   POST /api/cards/new
// @access  Private
const createCard = asyncHandler(async (req, res) => {
	const { name, cost, power, description, source, s3Key, s3Bucket } = req.body;
	const card = await prisma.card.create({
		data: {
			name,
			cost,
			power,
			description,
			source,
			s3Key,
			s3Bucket,
		},
	});
	// TODO: Use multer to upload an image to S3
	res.json(card);
});

// @desc    Update card
// @route   PUT /api/cards/update
// @access  Private
const updateCard = asyncHandler(async (req, res) => {
	const { id, name, cost, power, description, source } = req.body;
	const updatedCard = await prisma.card.update({
		where: {
			id,
		},
		data: {
			name,
			cost,
			power,
			description,
			source,
		},
	});
	res.json(updatedCard);
});

// @desc    Delete card
// @route   DELETE /api/cards/delete
// @access  Private
const deleteCard = asyncHandler(async (req, res) => {
	const { id } = req.body;
	const deletedCard = await prisma.card.delete({
		where: {
			id,
		},
	});
	res.json(deletedCard);
});

module.exports = {
	getCards,
	getUniqueCard,
	deleteCard,
	updateCard,
	deleteCard,
	createCard,
};
