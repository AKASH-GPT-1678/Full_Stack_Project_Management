/*
  Warnings:

  - You are about to drop the column `Notes` on the `Finance` table. All the data in the column will be lost.
  - You are about to drop the column `projectid` on the `Finance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Finance" DROP COLUMN "Notes",
DROP COLUMN "projectid",
ADD COLUMN     "notes" TEXT;
