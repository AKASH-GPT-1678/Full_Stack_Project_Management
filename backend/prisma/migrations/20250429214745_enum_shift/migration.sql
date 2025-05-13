-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Categories" ADD VALUE 'Food__Event_Services';
ALTER TYPE "Categories" ADD VALUE 'Beauty__Wellness';
ALTER TYPE "Categories" ADD VALUE 'Home_Services';
ALTER TYPE "Categories" ADD VALUE 'Local_Services';
ALTER TYPE "Categories" ADD VALUE 'Errands__Delivery';
ALTER TYPE "Categories" ADD VALUE 'Miscellaneous_Services';
