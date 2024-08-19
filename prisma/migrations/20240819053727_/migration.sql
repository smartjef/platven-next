/*
  Warnings:

  - The primary key for the `Click` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[url]` on the table `Click` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `Click` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Click" DROP CONSTRAINT "Click_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Click_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Click_url_key" ON "Click"("url");
