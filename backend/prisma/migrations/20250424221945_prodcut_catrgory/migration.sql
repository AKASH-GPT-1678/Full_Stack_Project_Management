/*
  Warnings:

  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('Basic_Electricals', 'Construction_Essentials', 'Party_Essentials', 'Food_Essentials', 'Pharma_Essentials', 'Apparels_Clothing_and_Garments', 'Electrical_Goods_and_Supplies', 'Hospital_and_Medical_Equipment', 'Industrial_Plants_Machinery_and_Equipment');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Categories" NOT NULL,
ALTER COLUMN "expirydate" DROP NOT NULL;
