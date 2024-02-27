/*
  Warnings:

  - The primary key for the `UserToken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserToken" DROP CONSTRAINT "UserToken_pkey",
ALTER COLUMN "token" SET DATA TYPE CHAR(256),
ADD CONSTRAINT "UserToken_pkey" PRIMARY KEY ("token");
