/*
  Warnings:

  - Added the required column `status` to the `JobProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobProfile" ADD COLUMN     "status" BOOLEAN NOT NULL;
