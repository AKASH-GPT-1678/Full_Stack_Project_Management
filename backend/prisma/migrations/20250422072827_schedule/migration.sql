-- CreateEnum
CREATE TYPE "Msgtype" AS ENUM ('Email', 'Whatsapp');

-- CreateEnum
CREATE TYPE "ScheduleMsgStatus" AS ENUM ('Pending', 'Delivered');

-- CreateTable
CREATE TABLE "ScheduleMsg" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phonenum" TEXT,
    "Datetime" TEXT,
    "type" "Msgtype",
    "text" TEXT,
    "status" "ScheduleMsgStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectid" TEXT NOT NULL,

    CONSTRAINT "ScheduleMsg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduleMsg" ADD CONSTRAINT "ScheduleMsg_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
