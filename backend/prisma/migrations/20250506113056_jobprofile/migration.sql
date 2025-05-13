-- CreateTable
CREATE TABLE "JobProfile" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "jobsapplied" TEXT[],
    "lastdisabled" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workdone" INTEGER NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "JobProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobProfile_id_idx" ON "JobProfile"("id");

-- AddForeignKey
ALTER TABLE "JobProfile" ADD CONSTRAINT "JobProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
