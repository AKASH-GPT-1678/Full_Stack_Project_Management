-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "valueperpeice" TEXT,
    "projectid" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
