/*
  Warnings:

  - You are about to drop the column `productid` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productid_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "productid",
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "userid" TEXT,
ADD COLUMN     "username" TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
