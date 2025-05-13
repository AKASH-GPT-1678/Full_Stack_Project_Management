-- CreateEnum
CREATE TYPE "Typetrans" AS ENUM ('Debit', 'Credit');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Success', 'Pending');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "budget" INTEGER;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "gstrate" INTEGER DEFAULT 0,
    "dealer" TEXT NOT NULL,
    "status" "Status",
    "proof" TEXT,
    "type" "Typetrans" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "financeid" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" TEXT NOT NULL,
    "Notes" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,
    "income" INTEGER,
    "expenditure" INTEGER,
    "budget" INTEGER,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_financeid_fkey" FOREIGN KEY ("financeid") REFERENCES "Finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_id_fkey" FOREIGN KEY ("id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
