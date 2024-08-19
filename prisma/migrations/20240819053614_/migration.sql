-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);
