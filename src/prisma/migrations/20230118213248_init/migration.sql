-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "Keyword" AS ENUM ('VANILLA', 'REVEAL', 'DESTROY', 'ONGOING', 'DISCARD', 'MOVE', 'SPECIAL');

-- CreateEnum
CREATE TYPE "Pool" AS ENUM ('STARTER', 'RECRUIT', 'POOL_0', 'POOL_1', 'POOL_2', 'POOL_3', 'POOL_4', 'POOL_5', 'SUMMON');

-- CreateEnum
CREATE TYPE "EffectType" AS ENUM ('BUFF_CARD', 'NERF_CARD', 'BUFF_POWER', 'NERF_POWER', 'ADD_TO_LOCATION', 'SPECIAL');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "pool" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "s3Key" TEXT,
    "s3Bucket" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "s3Key" TEXT,
    "s3Bucket" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationEffect" (
    "locationId" INTEGER NOT NULL,
    "effectType" "EffectType" NOT NULL,
    "action" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CardEffect" (
    "cardId" INTEGER NOT NULL,
    "effectType" "EffectType" NOT NULL,
    "action" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_name_key" ON "Card"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LocationEffect_locationId_key" ON "LocationEffect"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "CardEffect_cardId_key" ON "CardEffect"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
