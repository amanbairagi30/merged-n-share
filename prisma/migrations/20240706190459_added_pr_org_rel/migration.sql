/*
  Warnings:

  - Added the required column `orgId` to the `PullRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PullRequest" ADD COLUMN     "orgId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PullRequest" ADD CONSTRAINT "PullRequest_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
