-- CreateTable
CREATE TABLE "Organisations" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT DEFAULT 'https://www.campusfrance.org/sites/default/files/styles/mobile_visuel_principal_page/public/organisation%20organigramme_3.jpg?itok=qD2R_LHp',
    "github_url" TEXT,

    CONSTRAINT "Organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PullRequest" (
    "id" TEXT NOT NULL,
    "prURL" TEXT NOT NULL,
    "prTitle" TEXT NOT NULL,
    "prNumber" INTEGER NOT NULL,
    "repoURL" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "commentURL" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "mergedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT,
    "prPoint" INTEGER NOT NULL,
    "draft" BOOLEAN NOT NULL,
    "bounty" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PullRequest" ADD CONSTRAINT "PullRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
