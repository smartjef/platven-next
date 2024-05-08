/*
  Warnings:

  - A unique constraint covering the columns `[identificationNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `landMark` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roadAccessNature` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identificationNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PropertyRoadAccessNature" AS ENUM ('Highway', 'Tarmac');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Organization', 'Individual');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "landMark" TEXT NOT NULL,
ADD COLUMN     "roadAccessNature" "PropertyRoadAccessNature" NOT NULL,
ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "identificationNumber" TEXT NOT NULL,
ADD COLUMN     "isSuperUser" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "UserType" NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_identificationNumber_key" ON "User"("identificationNumber");
