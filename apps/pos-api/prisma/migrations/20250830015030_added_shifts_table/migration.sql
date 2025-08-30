-- CreateTable
CREATE TABLE "public"."Shift" (
    "id" TEXT NOT NULL,
    "cashStart" DECIMAL(10,2) NOT NULL DEFAULT 300,
    "cashEnd" DECIMAL(10,2),
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);
