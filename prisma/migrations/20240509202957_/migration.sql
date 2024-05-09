-- CreateTable
CREATE TABLE "OTPVerificatiion" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTPVerificatiion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OTPVerificatiion_id_key" ON "OTPVerificatiion"("id");

-- AddForeignKey
ALTER TABLE "OTPVerificatiion" ADD CONSTRAINT "OTPVerificatiion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
