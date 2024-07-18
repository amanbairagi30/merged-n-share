-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubProfile" TEXT,
ADD COLUMN     "isProfilePublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "linkedInProfile" TEXT,
ADD COLUMN     "xProfile" TEXT;
