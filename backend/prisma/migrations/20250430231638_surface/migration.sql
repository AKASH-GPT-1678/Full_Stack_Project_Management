-- DropIndex
DROP INDEX "Review_productid_key";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "questions" TEXT[];

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "review" TEXT;
