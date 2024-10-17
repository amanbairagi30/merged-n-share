/*
  Warnings:

  - You are about to drop the column `viewedAt` on the `ProfileView` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,viewerIp]` on the table `ProfileView` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProfileView" DROP COLUMN "viewedAt",
ADD COLUMN     "lastViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "ProfileView_userId_viewerIp_key" ON "ProfileView"("userId", "viewerIp");
