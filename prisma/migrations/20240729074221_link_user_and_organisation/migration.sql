-- CreateTable
CREATE TABLE "_UserContributions" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserContributions_AB_unique" ON "_UserContributions"("A", "B");

-- CreateIndex
CREATE INDEX "_UserContributions_B_index" ON "_UserContributions"("B");

-- AddForeignKey
ALTER TABLE "_UserContributions" ADD CONSTRAINT "_UserContributions_A_fkey" FOREIGN KEY ("A") REFERENCES "Organisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserContributions" ADD CONSTRAINT "_UserContributions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
