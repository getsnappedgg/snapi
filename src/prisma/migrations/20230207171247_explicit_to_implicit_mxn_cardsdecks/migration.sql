/*
  Warnings:

  - You are about to drop the `CardsOnDecks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CardsOnDecks" DROP CONSTRAINT "CardsOnDecks_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardsOnDecks" DROP CONSTRAINT "CardsOnDecks_deckId_fkey";

-- DropTable
DROP TABLE "CardsOnDecks";

-- CreateTable
CREATE TABLE "_CardToDeck" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardToDeck_AB_unique" ON "_CardToDeck"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToDeck_B_index" ON "_CardToDeck"("B");

-- AddForeignKey
ALTER TABLE "_CardToDeck" ADD CONSTRAINT "_CardToDeck_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToDeck" ADD CONSTRAINT "_CardToDeck_B_fkey" FOREIGN KEY ("B") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
