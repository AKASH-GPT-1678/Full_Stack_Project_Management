-- DropIndex
DROP INDEX "Order_sellerid_idx";

-- CreateIndex
CREATE INDEX "Order_sellerid_buyerId_idx" ON "Order"("sellerid", "buyerId");
