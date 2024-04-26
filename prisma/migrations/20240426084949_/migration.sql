-- CreateTable
CREATE TABLE "County" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capital" TEXT NOT NULL,

    CONSTRAINT "County_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "SubCounty" (
    "code" TEXT NOT NULL,
    "countyNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubCounty_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "County_code_key" ON "County"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SubCounty_code_key" ON "SubCounty"("code");

-- AddForeignKey
ALTER TABLE "SubCounty" ADD CONSTRAINT "SubCounty_countyNumber_fkey" FOREIGN KEY ("countyNumber") REFERENCES "County"("code") ON DELETE CASCADE ON UPDATE CASCADE;
