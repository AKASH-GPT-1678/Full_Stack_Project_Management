/*
  Warnings:

  - You are about to drop the column `userid` on the `SellerAccount` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SellerAccount" DROP CONSTRAINT "SellerAccount_userid_fkey";

-- DropIndex
DROP INDEX "SellerAccount_userid_key";

-- AlterTable
ALTER TABLE "SellerAccount" DROP COLUMN "userid";

-- AddForeignKey
ALTER TABLE "SellerAccount" ADD CONSTRAINT "SellerAccount_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
