/*
  Warnings:

  - Added the required column `ong_id` to the `finances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."finances" ADD COLUMN     "ong_id" TEXT NOT NULL;
