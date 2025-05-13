-- CreateTable
CREATE TABLE "Remainders" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "dealer" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "financeId" TEXT NOT NULL,

    CONSTRAINT "Remainders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Remainders" ADD CONSTRAINT "Remainders_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "Finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
