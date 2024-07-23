-- CreateTable
CREATE TABLE "menus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "menus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
