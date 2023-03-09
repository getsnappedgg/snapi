/*
  Warnings:

  - The primary key for the `CardsOnDecks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CardsOnDecks` table. All the data in the column will be lost.
  - The primary key for the `KeywordsOnCards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `KeywordsOnCards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CardsOnDecks" DROP CONSTRAINT "CardsOnDecks_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CardsOnDecks_pkey" PRIMARY KEY ("cardId", "deckId");

-- AlterTable
ALTER TABLE "KeywordsOnCards" DROP CONSTRAINT "KeywordsOnCards_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "KeywordsOnCards_pkey" PRIMARY KEY ("cardId", "keywordId");

-- DropEnum
DROP TYPE "Keywords";
