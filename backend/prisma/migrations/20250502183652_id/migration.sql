-- DropForeignKey
ALTER TABLE "Dealers" DROP CONSTRAINT "Dealers_dealerid_fkey";

-- AlterTable
ALTER TABLE "Dealers" ALTER COLUMN "dealerid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Dealers" ADD CONSTRAINT "Dealers_dealerid_fkey" FOREIGN KEY ("dealerid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
