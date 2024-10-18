-- CreateTable
CREATE TABLE "_UserSavedOrganisations" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSavedOrganisations_AB_unique" ON "_UserSavedOrganisations"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSavedOrganisations_B_index" ON "_UserSavedOrganisations"("B");

-- AddForeignKey
ALTER TABLE "_UserSavedOrganisations" ADD CONSTRAINT "_UserSavedOrganisations_A_fkey" FOREIGN KEY ("A") REFERENCES "Organisations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSavedOrganisations" ADD CONSTRAINT "_UserSavedOrganisations_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
