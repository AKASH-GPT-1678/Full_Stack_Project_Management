/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('Home_Delivery', 'Offline', 'Call');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Product', 'Service');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerid_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productid_fkey";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT,
    "description" TEXT,
    "rating" TEXT,
    "imageurl" TEXT,
    "quantity" TEXT,
    "sellerName" TEXT NOT NULL,
    "expirydate" TEXT,
    "category" "Categories" NOT NULL,
    "specialmsg" TEXT,
    "contact" INTEGER,
    "mode" "Mode",
    "type" "Type" NOT NULL,
    "offers" TEXT,
    "sellerid" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_sellerid_fkey" FOREIGN KEY ("sellerid") REFERENCES "SellerAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
