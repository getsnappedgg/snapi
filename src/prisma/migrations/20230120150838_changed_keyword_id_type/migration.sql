/*
  Warnings:

  - The primary key for the `Keyword` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "KeywordsOnCards" DROP CONSTRAINT "KeywordsOnCards_keywordId_fkey";

-- AlterTable
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Keyword_id_seq";

-- AlterTable
ALTER TABLE "KeywordsOnCards" ALTER COLUMN "keywordId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "KeywordsOnCards" ADD CONSTRAINT "KeywordsOnCards_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
