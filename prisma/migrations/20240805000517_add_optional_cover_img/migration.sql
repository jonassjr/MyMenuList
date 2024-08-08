-- AlterTable
ALTER TABLE "menus" ADD COLUMN "coverImg" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "cautions" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoriesId" TEXT NOT NULL,
    "menusId" TEXT,
    CONSTRAINT "items_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "items_menusId_fkey" FOREIGN KEY ("menusId") REFERENCES "menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_items" ("availability", "categoriesId", "cautions", "createdAt", "description", "id", "img", "ingredients", "name", "price", "tags", "updatedAt") SELECT "availability", "categoriesId", "cautions", "createdAt", "description", "id", "img", "ingredients", "name", "price", "tags", "updatedAt" FROM "items";
DROP TABLE "items";
ALTER TABLE "new_items" RENAME TO "items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
