/*
  Warnings:

  - You are about to drop the column `url` on the `Click` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Click_url_key";

-- AlterTable
ALTER TABLE "Click" DROP COLUMN "url";
