-- AlterTable
ALTER TABLE "Dealers" ADD COLUMN     "userid" TEXT;

-- CreateIndex
CREATE INDEX "Dealers_dealeremail_idx" ON "Dealers"("dealeremail");
