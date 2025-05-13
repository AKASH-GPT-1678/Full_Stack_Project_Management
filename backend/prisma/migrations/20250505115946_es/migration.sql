/*
  Warnings:

  - You are about to drop the column `buyerid` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_buyerid_fkey";

-- DropIndex
DROP INDEX "Order_buyerid_sellerid_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "buyerid";

-- CreateTable
CREATE TABLE "_OrderToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderToUser_B_index" ON "_OrderToUser"("B");

-- CreateIndex
CREATE INDEX "Order_sellerid_idx" ON "Order"("sellerid");

-- AddForeignKey
ALTER TABLE "_OrderToUser" ADD CONSTRAINT "_OrderToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToUser" ADD CONSTRAINT "_OrderToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
