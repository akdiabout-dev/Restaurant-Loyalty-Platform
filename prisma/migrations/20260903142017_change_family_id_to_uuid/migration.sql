/*
  Warnings:

  - Changed the type of `familyId` on the `RefreshSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RefreshSession" DROP COLUMN "familyId",
ADD COLUMN     "familyId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "RefreshSession_familyId_idx" ON "RefreshSession"("familyId");
