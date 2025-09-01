/*
  Warnings:

  - Added the required column `userName` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."posts" ADD COLUMN     "userName" TEXT NOT NULL;
