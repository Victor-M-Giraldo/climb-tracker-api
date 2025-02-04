/*
  Warnings:

  - You are about to drop the column `name` on the `Climb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Climb" DROP COLUMN "name",
ALTER COLUMN "location" DROP NOT NULL;
