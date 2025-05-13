/*
  Warnings:

  - You are about to drop the column `projectid` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `projectid` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `projectid` on the `ScheduleMsg` table. All the data in the column will be lost.
  - You are about to drop the column `projectid` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `financeid` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `ScheduleMsg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financeId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_projectid_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_projectid_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleMsg" DROP CONSTRAINT "ScheduleMsg_projectid_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectid_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_financeid_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "projectid",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "projectid",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ScheduleMsg" DROP COLUMN "projectid",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "projectid",
ADD COLUMN     "projectId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "financeid",
ADD COLUMN     "financeId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Member_projectId_idx" ON "Member"("projectId");

-- CreateIndex
CREATE INDEX "Task_projectId_idx" ON "Task"("projectId");

-- CreateIndex
CREATE INDEX "Transaction_financeId_idx" ON "Transaction"("financeId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "Finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleMsg" ADD CONSTRAINT "ScheduleMsg_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
