-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,
    "name" TEXT,
    "useremail" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_useremail_fkey" FOREIGN KEY ("useremail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
