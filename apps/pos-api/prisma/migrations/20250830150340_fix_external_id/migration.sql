-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "externalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."OrderProduct" ALTER COLUMN "externalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "externalId" SET DATA TYPE TEXT;
