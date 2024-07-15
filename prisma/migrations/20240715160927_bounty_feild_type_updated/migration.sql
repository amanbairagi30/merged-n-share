/*
  Warnings:

  - The `bounty` column on the `PullRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PullRequest" DROP COLUMN "bounty",
ADD COLUMN     "bounty" INTEGER;
