/*
  Warnings:

  - The primary key for the `KeywordsOnCards` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_sourceId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "sourceId" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE cardsondecks_id_seq;
ALTER TABLE "CardsOnDecks" ALTER COLUMN "id" SET DEFAULT nextval('cardsondecks_id_seq');
ALTER SEQUENCE cardsondecks_id_seq OWNED BY "CardsOnDecks"."id";

-- AlterTable
CREATE SEQUENCE keywordsoncards_id_seq;
ALTER TABLE "KeywordsOnCards" DROP CONSTRAINT "KeywordsOnCards_pkey",
ALTER COLUMN "id" SET DEFAULT nextval('keywordsoncards_id_seq'),
ADD CONSTRAINT "KeywordsOnCards_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE keywordsoncards_id_seq OWNED BY "KeywordsOnCards"."id";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;
