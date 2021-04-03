/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[text,lessonId]` on the table `sentence`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "sentence.text_unique";

-- CreateIndex
CREATE UNIQUE INDEX "sentence_text_lesson_key" ON "sentence"("text", "lessonId");
