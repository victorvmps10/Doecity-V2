/*
  Warnings:

  - Added the required column `photo_user` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."posts" ADD COLUMN     "photo_user" TEXT NOT NULL;
