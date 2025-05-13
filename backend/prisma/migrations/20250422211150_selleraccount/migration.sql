-- CreateTable
CREATE TABLE "SellerAccount" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "sales" TEXT,

    CONSTRAINT "SellerAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT,
    "description" TEXT,
    "rating" TEXT,
    "imageurl" TEXT,
    "quantity" TEXT,
    "sellerName" TEXT NOT NULL,
    "expirydate" TEXT NOT NULL,
    "specialmsg" TEXT,
    "offers" TEXT,
    "sellerid" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "productid" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SellerAccount_userid_key" ON "SellerAccount"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sellerid_key" ON "Product"("sellerid");

-- CreateIndex
CREATE UNIQUE INDEX "Review_productid_key" ON "Review"("productid");

-- AddForeignKey
ALTER TABLE "SellerAccount" ADD CONSTRAINT "SellerAccount_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerid_fkey" FOREIGN KEY ("sellerid") REFERENCES "SellerAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
