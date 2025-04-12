-- CreateTable
CREATE TABLE "Details" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googlemail" TEXT,
    "extra" TEXT,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);
