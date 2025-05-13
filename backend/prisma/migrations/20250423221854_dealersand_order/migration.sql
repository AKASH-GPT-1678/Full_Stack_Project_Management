-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Delivered');

-- CreateTable
CREATE TABLE "Dealers" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phonenum" TEXT,
    "verified" BOOLEAN,
    "transactionWorth" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dealers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "dealerid" TEXT NOT NULL,
    "orderStatus" "OrderStatus",
    "orders" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DealersToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DealersToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DealersToUser_B_index" ON "_DealersToUser"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dealerid_fkey" FOREIGN KEY ("dealerid") REFERENCES "Dealers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealersToUser" ADD CONSTRAINT "_DealersToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Dealers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealersToUser" ADD CONSTRAINT "_DealersToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
