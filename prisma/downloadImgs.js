const request = require("request");
const fs = require("fs");
import cardList from "./cardList.json";
const baseUrl = "https://static.marvelsnap.pro/cards/";
const folder = "/src/images";
let url, fileName, capitalCard;

cardList.foreach(card => {
	capitalCard =
		card.card[0].toUpperCase() + card.card.substring(1, card.card.length);
	console.log(capitalCard);
	// url = baseUrl + card.card + ".webp";
	// fileName = card.card + ".png";

	// request(url)
	// 	.pipe(fs.createWriteStream(`${folder}${fileName}`))
	// 	.on("close", () => console.log(`Saved ${fileName}`));
});
