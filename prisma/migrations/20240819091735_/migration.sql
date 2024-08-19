-- CreateTable
CREATE TABLE "Click" (
    "id" UUID NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);
