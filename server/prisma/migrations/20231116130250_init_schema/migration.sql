-- CreateTable
CREATE TABLE "Translate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Translate_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discordId" TEXT NOT NULL,
    "preferLang" TEXT NOT NULL DEFAULT 'en-GB',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
