/*
  Warnings:

  - The values [EventManagement,ConstructionProjects,SoftwareDevelopment,MarketingCampaigns,CorporateProjects] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Event_Management', 'Construction_Projects', 'Software_Development', 'Marketing_Campaigns', 'Corporate_Projects', 'Others');
ALTER TABLE "Project" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;
