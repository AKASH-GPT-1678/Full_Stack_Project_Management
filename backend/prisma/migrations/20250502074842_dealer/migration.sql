/*
  Warnings:

  - You are about to drop the `_DealersToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DealersToUser" DROP CONSTRAINT "_DealersToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_DealersToUser" DROP CONSTRAINT "_DealersToUser_B_fkey";

-- AlterTable
ALTER TABLE "Dealers" ADD COLUMN     "dealeremail" TEXT;

-- DropTable
DROP TABLE "_DealersToUser";

-- AddForeignKey
ALTER TABLE "Dealers" ADD CONSTRAINT "Dealers_dealeremail_fkey" FOREIGN KEY ("dealeremail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
