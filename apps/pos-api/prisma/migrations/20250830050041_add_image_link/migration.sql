/*
  Warnings:

  - Added the required column `link` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Image" ADD COLUMN     "link" TEXT NOT NULL;
