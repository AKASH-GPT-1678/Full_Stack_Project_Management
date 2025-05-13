/*
  Warnings:

  - Added the required column `dealerid` to the `Dealers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dealers" DROP CONSTRAINT "Dealers_dealeremail_fkey";

-- AlterTable
ALTER TABLE "Dealers" ADD COLUMN     "dealerid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Dealers" ADD CONSTRAINT "Dealers_dealerid_fkey" FOREIGN KEY ("dealerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
