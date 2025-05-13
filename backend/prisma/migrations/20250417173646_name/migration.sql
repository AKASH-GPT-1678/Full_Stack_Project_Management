/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectid_fkey";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "team" TEXT[],
    "amount" INTEGER,
    "startdate" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "supplier" TEXT[],
    "subtasks" TEXT[],
    "inventories" TEXT[],
    "teamlead" TEXT,
    "priority" TEXT,
    "status" BOOLEAN,
    "projectid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
