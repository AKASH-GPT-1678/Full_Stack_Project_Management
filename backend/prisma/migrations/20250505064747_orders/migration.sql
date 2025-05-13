/*
  Warnings:

  - You are about to drop the column `dealerid` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_dealerid_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dealerid";
