/*
  Warnings:

  - A unique constraint covering the columns `[pageName]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN "pageName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_pageName_key" ON "users"("pageName");
