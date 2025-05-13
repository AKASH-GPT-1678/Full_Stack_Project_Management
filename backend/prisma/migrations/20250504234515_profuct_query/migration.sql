-- AlterTable
ALTER TABLE "User" ALTER COLUMN "contact" SET DEFAULT 99999;

-- CreateTable
CREATE TABLE "ProductQuery" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "name" TEXT,
    "contact" TEXT,
    "question" TEXT[],
    "answers" TEXT[],
    "productId" TEXT,

    CONSTRAINT "ProductQuery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductQuery_productId_userid_idx" ON "ProductQuery"("productId", "userid");

-- AddForeignKey
ALTER TABLE "ProductQuery" ADD CONSTRAINT "ProductQuery_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQuery" ADD CONSTRAINT "ProductQuery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
