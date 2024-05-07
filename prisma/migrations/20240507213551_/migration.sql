-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "rejectionReason" TEXT,
ALTER COLUMN "isActive" SET DEFAULT false;
