/*
  Warnings:

  - You are about to drop the `_OrderToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToUser" DROP CONSTRAINT "_OrderToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToUser" DROP CONSTRAINT "_OrderToUser_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "buyerId" TEXT;

-- DropTable
DROP TABLE "_OrderToUser";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
