/*
  Warnings:

  - You are about to drop the column `nativeName` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `language` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[name]` on the table `course`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name,nativeName]` on the table `language`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "language.language_unique";

-- DropIndex
DROP INDEX "course_name_nativeName_key";

-- DropForeignKey
ALTER TABLE "lesson" DROP CONSTRAINT "lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "sentence" DROP CONSTRAINT "sentence_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "translation" DROP CONSTRAINT "translation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "translation" DROP CONSTRAINT "translation_sentenceId_fkey";

-- AlterTable
ALTER TABLE "course" DROP COLUMN "nativeName",
ADD COLUMN     "languageId" uuid NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "language" DROP COLUMN "language",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "nativeName" TEXT,
ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "lesson" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "sentence" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "translation" ALTER COLUMN "id" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "course.name_unique" ON "course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lanaguage_name_nativeName_key" ON "language"("name", "nativeName");

-- AddForeignKey
ALTER TABLE "course" ADD FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson" ADD FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentence" ADD FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD FOREIGN KEY ("sentenceId") REFERENCES "sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
