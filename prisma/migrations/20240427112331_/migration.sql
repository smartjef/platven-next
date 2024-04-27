-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "amount" MONEY NOT NULL,
    "propertyId" UUID NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "merchantRequestId" TEXT NOT NULL,
    "checkoutRequestId" TEXT NOT NULL,
    "resultCode" TEXT,
    "resultDescription" TEXT,
    "mpesareceiptNumber" TEXT,
    "transactionDate" BIGINT,
    "phoneNumber" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_propertyId_key" ON "Payment"("propertyId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
