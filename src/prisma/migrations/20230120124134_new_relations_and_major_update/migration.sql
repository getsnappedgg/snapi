/*
  Warnings:

  - You are about to drop the column `keyword` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `pool` on the `Card` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Made the column `s3Key` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `s3Bucket` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `userId` on the `Deck` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `s3Key` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `s3Bucket` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Keywords" AS ENUM ('VANILLA', 'REVEAL', 'DESTROY', 'ONGOING', 'DISCARD', 'MOVE', 'SPECIAL');

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_userId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "keyword",
DROP COLUMN "pool",
ADD COLUMN     "sourceId" INTEGER NOT NULL,
ALTER COLUMN "s3Key" SET NOT NULL,
ALTER COLUMN "s3Bucket" SET NOT NULL;

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "s3Key" SET NOT NULL,
ALTER COLUMN "s3Bucket" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "Keyword";

-- DropEnum
DROP TYPE "Pool";

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeywordsOnCards" (
    "id" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "keywordId" INTEGER NOT NULL,

    CONSTRAINT "KeywordsOnCards_pkey" PRIMARY KEY ("cardId","keywordId")
);

-- CreateTable
CREATE TABLE "CardsOnDecks" (
    "id" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "deckId" INTEGER NOT NULL,

    CONSTRAINT "CardsOnDecks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_keyword_key" ON "Keyword"("keyword");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordsOnCards" ADD CONSTRAINT "KeywordsOnCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordsOnCards" ADD CONSTRAINT "KeywordsOnCards_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsOnDecks" ADD CONSTRAINT "CardsOnDecks_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsOnDecks" ADD CONSTRAINT "CardsOnDecks_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
