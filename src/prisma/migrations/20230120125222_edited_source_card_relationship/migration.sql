/*
  Warnings:

  - The primary key for the `Source` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Source` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_sourceId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "sourceId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Source" DROP CONSTRAINT "Source_pkey",
DROP COLUMN "description",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Source_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Source_id_seq";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
