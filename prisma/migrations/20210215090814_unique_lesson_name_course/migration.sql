/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name,courseId]` on the table `lesson`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "lesson.name_unique";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "languageId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lesson_name_course_key" ON "lesson"("name", "courseId");
