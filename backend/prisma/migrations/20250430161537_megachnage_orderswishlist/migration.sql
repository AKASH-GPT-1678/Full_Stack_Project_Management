-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_dealerid_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "buyerid" TEXT,
ADD COLUMN     "sellerid" TEXT,
ALTER COLUMN "dealerid" DROP NOT NULL;

-- CreateTable
CREATE TABLE "WishList" (
    "id" TEXT NOT NULL,
    "userid" TEXT,
    "productid" TEXT,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderToProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "WishList_userid_productid_idx" ON "WishList"("userid", "productid");

-- CreateIndex
CREATE INDEX "_OrderToProducts_B_index" ON "_OrderToProducts"("B");

-- CreateIndex
CREATE INDEX "Order_buyerid_sellerid_idx" ON "Order"("buyerid", "sellerid");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dealerid_fkey" FOREIGN KEY ("dealerid") REFERENCES "Dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sellerid_fkey" FOREIGN KEY ("sellerid") REFERENCES "SellerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerid_fkey" FOREIGN KEY ("buyerid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProducts" ADD CONSTRAINT "_OrderToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProducts" ADD CONSTRAINT "_OrderToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
