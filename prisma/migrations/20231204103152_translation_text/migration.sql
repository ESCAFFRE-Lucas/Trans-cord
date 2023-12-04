/*
  Warnings:

  - Added the required column `translationText` to the `Translate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Translate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "translationText" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Translate_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Translate" ("createdAt", "discordId", "id", "language", "text") SELECT "createdAt", "discordId", "id", "language", "text" FROM "Translate";
DROP TABLE "Translate";
ALTER TABLE "new_Translate" RENAME TO "Translate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
