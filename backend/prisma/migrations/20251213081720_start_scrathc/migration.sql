-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('Pending', 'Delivered');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('Event_Management', 'Construction_Projects', 'Software_Development', 'Marketing_Campaigns', 'Corporate_Projects', 'Others');

-- CreateEnum
CREATE TYPE "public"."Typetrans" AS ENUM ('Debit', 'Credit');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('Success', 'Pending');

-- CreateEnum
CREATE TYPE "public"."NoteType" AS ENUM ('Finance', 'Legal');

-- CreateEnum
CREATE TYPE "public"."Msgtype" AS ENUM ('Email', 'Whatsapp');

-- CreateEnum
CREATE TYPE "public"."ScheduleMsgStatus" AS ENUM ('Pending', 'Delivered');

-- CreateEnum
CREATE TYPE "public"."Categories" AS ENUM ('Basic_Electricals', 'Construction_Essentials', 'Party_Essentials', 'Food_Essentials', 'Pharma_Essentials', 'Apparels_Clothing_and_Garments', 'Electrical_Goods_and_Supplies', 'Hospital_and_Medical_Equipment', 'Industrial_Plants_Machinery_and_Equipment', 'Food_Event_Services', 'Beauty_Wellness', 'Home_Services', 'Local_Services', 'Errands_Delivery', 'Miscellaneous_Services', 'Consultancy');

-- CreateEnum
CREATE TYPE "public"."Mode" AS ENUM ('Home_Delivery', 'Offline', 'Call');

-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('Product', 'Service');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googlemail" TEXT,
    "extra" TEXT,
    "profileUrl" TEXT,
    "contact" BIGINT DEFAULT 99999,
    "lastname" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobProfile" (
    "id" TEXT NOT NULL,
    "rating" INTEGER,
    "jobsapplied" TEXT[],
    "lastdisabled" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workdone" INTEGER,
    "status" BOOLEAN NOT NULL,
    "location" TEXT,

    CONSTRAINT "JobProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dealers" (
    "id" TEXT NOT NULL,
    "idd" TEXT,
    "name" TEXT,
    "dealeremail" TEXT,
    "dealerid" TEXT,
    "email" TEXT,
    "phonenum" TEXT,
    "verified" BOOLEAN,
    "address" TEXT,
    "category" TEXT,
    "transactionWorth" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dealers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "orderStatus" "public"."OrderStatus",
    "sellerid" TEXT,
    "buyerName" TEXT NOT NULL,
    "buyerEmail" TEXT NOT NULL,
    "buyerContact" TEXT,
    "buyerId" TEXT,
    "orders" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" TEXT NOT NULL,
    "coverimgUrl" TEXT,
    "budget" INTEGER DEFAULT 0,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Member" (
    "id" TEXT NOT NULL,
    "userid" TEXT,
    "projectId" TEXT NOT NULL,
    "name" TEXT,
    "useremail" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Inventory" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" BIGINT NOT NULL,
    "stock" TEXT,
    "valueperpeice" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Team" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "phonenum" INTEGER NOT NULL,
    "useriid" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Listing" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "soldout" BOOLEAN NOT NULL,
    "description" TEXT,
    "ownerId" TEXT,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "team" TEXT[],
    "amount" INTEGER,
    "startdate" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "supplier" TEXT[],
    "subtasks" TEXT[],
    "inventories" TEXT[],
    "teamlead" TEXT,
    "priority" TEXT,
    "status" BOOLEAN,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "gstrate" INTEGER DEFAULT 0,
    "dealer" TEXT NOT NULL,
    "status" "public"."Status",
    "proof" TEXT,
    "type" "public"."Typetrans" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "financeId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Finance" (
    "id" TEXT NOT NULL,
    "income" INTEGER DEFAULT 0,
    "expenditure" INTEGER DEFAULT 0,
    "budget" INTEGER DEFAULT 0,
    "balance" INTEGER DEFAULT 0,
    "MPIN" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Remainders" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "dealer" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "financeId" TEXT NOT NULL,

    CONSTRAINT "Remainders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Note" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "financeId" TEXT NOT NULL,
    "type" "public"."NoteType",

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScheduleMsg" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phonenum" TEXT,
    "Datetime" TEXT,
    "type" "public"."Msgtype",
    "text" TEXT,
    "status" "public"."ScheduleMsgStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ScheduleMsg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SellerAccount" (
    "id" TEXT NOT NULL,
    "sales" TEXT,

    CONSTRAINT "SellerAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT,
    "description" TEXT,
    "rating" TEXT,
    "imageurl" TEXT,
    "quantity" TEXT,
    "sellerName" TEXT NOT NULL,
    "expirydate" TEXT,
    "category" "public"."Categories" NOT NULL,
    "specialmsg" TEXT,
    "stock" TEXT,
    "contact" TEXT,
    "questions" TEXT[],
    "mode" "public"."Mode",
    "type" "public"."Type" NOT NULL,
    "offers" TEXT,
    "sellerid" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductQuery" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "userid" TEXT NOT NULL,
    "name" TEXT,
    "contact" TEXT,
    "additionalQueies" TEXT,
    "question" TEXT[],
    "answers" TEXT[],
    "productId" TEXT,

    CONSTRAINT "ProductQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WishList" (
    "id" TEXT NOT NULL,
    "userid" TEXT,
    "productid" TEXT,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "review" TEXT,
    "userid" TEXT,
    "username" TEXT,
    "productId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "originalName" TEXT,
    "title" TEXT NOT NULL,
    "storageUrl" TEXT,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEncrypted" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_OrderToProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderToProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "JobProfile_id_idx" ON "public"."JobProfile"("id");

-- CreateIndex
CREATE INDEX "Dealers_dealerid_idx" ON "public"."Dealers"("dealerid");

-- CreateIndex
CREATE INDEX "Order_sellerid_buyerId_idx" ON "public"."Order"("sellerid", "buyerId");

-- CreateIndex
CREATE INDEX "Member_projectId_idx" ON "public"."Member"("projectId");

-- CreateIndex
CREATE INDEX "Task_projectId_idx" ON "public"."Task"("projectId");

-- CreateIndex
CREATE INDEX "Transaction_financeId_idx" ON "public"."Transaction"("financeId");

-- CreateIndex
CREATE UNIQUE INDEX "Finance_projectId_key" ON "public"."Finance"("projectId");

-- CreateIndex
CREATE INDEX "Products_sellerid_idx" ON "public"."Products"("sellerid");

-- CreateIndex
CREATE INDEX "ProductQuery_productId_userid_idx" ON "public"."ProductQuery"("productId", "userid");

-- CreateIndex
CREATE INDEX "WishList_userid_productid_idx" ON "public"."WishList"("userid", "productid");

-- CreateIndex
CREATE INDEX "Document_projectId_idx" ON "public"."Document"("projectId");

-- CreateIndex
CREATE INDEX "_OrderToProducts_B_index" ON "public"."_OrderToProducts"("B");

-- AddForeignKey
ALTER TABLE "public"."JobProfile" ADD CONSTRAINT "JobProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dealers" ADD CONSTRAINT "Dealers_dealerid_fkey" FOREIGN KEY ("dealerid") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_sellerid_fkey" FOREIGN KEY ("sellerid") REFERENCES "public"."SellerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_useremail_fkey" FOREIGN KEY ("useremail") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_useriid_fkey" FOREIGN KEY ("useriid") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Listing" ADD CONSTRAINT "Listing_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "public"."Finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Finance" ADD CONSTRAINT "Finance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Remainders" ADD CONSTRAINT "Remainders_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "public"."Finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "public"."Finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleMsg" ADD CONSTRAINT "ScheduleMsg_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SellerAccount" ADD CONSTRAINT "SellerAccount_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Products" ADD CONSTRAINT "Products_sellerid_fkey" FOREIGN KEY ("sellerid") REFERENCES "public"."SellerAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductQuery" ADD CONSTRAINT "ProductQuery_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductQuery" ADD CONSTRAINT "ProductQuery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WishList" ADD CONSTRAINT "WishList_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WishList" ADD CONSTRAINT "WishList_productid_fkey" FOREIGN KEY ("productid") REFERENCES "public"."Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrderToProducts" ADD CONSTRAINT "_OrderToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrderToProducts" ADD CONSTRAINT "_OrderToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
