-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('Finance', 'Legal');

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "type" "NoteType";

-- CreateIndex
CREATE INDEX "Products_sellerid_idx" ON "Products"("sellerid");
