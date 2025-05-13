-- DropIndex
DROP INDEX "Dealers_dealeremail_idx";

-- CreateIndex
CREATE INDEX "Dealers_dealerid_idx" ON "Dealers"("dealerid");
