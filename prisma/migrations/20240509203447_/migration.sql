/*
  Warnings:

  - Added the required column `expiry` to the `OTPVerificatiion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTPVerificatiion" ADD COLUMN     "expiry" TIMESTAMP(3) NOT NULL;
