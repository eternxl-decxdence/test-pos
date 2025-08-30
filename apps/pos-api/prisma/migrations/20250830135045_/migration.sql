-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "cardAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "cashAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
ALTER COLUMN "externalId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."OrderProduct" ALTER COLUMN "externalId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "externalId" DROP NOT NULL;
