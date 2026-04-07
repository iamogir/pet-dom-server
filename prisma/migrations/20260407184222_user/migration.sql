/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PetOwner` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "PetOwner" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";
