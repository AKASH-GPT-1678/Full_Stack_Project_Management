/*
  Warnings:

  - Added the required column `buyerEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_buyerId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "buyerContact" TEXT,
ADD COLUMN     "buyerEmail" TEXT NOT NULL,
ADD COLUMN     "buyerName" TEXT NOT NULL;
