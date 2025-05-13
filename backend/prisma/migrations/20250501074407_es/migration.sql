/*
  Warnings:

  - The values [Food__Event_Services,Beauty__Wellness,Errands__Delivery] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('Basic_Electricals', 'Construction_Essentials', 'Party_Essentials', 'Food_Essentials', 'Pharma_Essentials', 'Apparels_Clothing_and_Garments', 'Electrical_Goods_and_Supplies', 'Hospital_and_Medical_Equipment', 'Industrial_Plants_Machinery_and_Equipment', 'Food_Event_Services', 'Beauty_Wellness', 'Home_Services', 'Local_Services', 'Errands_Delivery', 'Miscellaneous_Services');
ALTER TABLE "Products" ALTER COLUMN "category" TYPE "Categories_new" USING ("category"::text::"Categories_new");
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;
