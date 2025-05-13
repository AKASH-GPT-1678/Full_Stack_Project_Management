/*
  Warnings:

  - You are about to drop the column `email` on the `Dealers` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Dealers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dealers" DROP COLUMN "email",
DROP COLUMN "userid";
