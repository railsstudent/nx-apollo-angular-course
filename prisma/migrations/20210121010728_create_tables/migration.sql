CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "course" (
    "id" uuid default uuid_generate_v4() NOT NULL,
    "name" TEXT,
    "nativeName" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language" (
    "id" uuid default uuid_generate_v4() NOT NULL,
    "language" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson" (
    "id" uuid default uuid_generate_v4() NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" uuid NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentence" (
    "id" uuid default uuid_generate_v4() NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lessonId" uuid NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation" (
    "id" uuid default uuid_generate_v4() NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageId" uuid,
    "sentenceId" uuid NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_name_nativeName_key" ON "course"("name", "nativeName");

-- CreateIndex
CREATE UNIQUE INDEX "language.language_unique" ON "language"("language");

-- CreateIndex
CREATE UNIQUE INDEX "lesson.name_unique" ON "lesson"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sentence.text_unique" ON "sentence"("text");

-- CreateIndex
CREATE UNIQUE INDEX "translation_languageId_sentenceId_key" ON "translation"("languageId", "sentenceId");

-- AddForeignKey
ALTER TABLE "lesson" ADD FOREIGN KEY("courseId")REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentence" ADD FOREIGN KEY("lessonId")REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD FOREIGN KEY("languageId")REFERENCES "language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD FOREIGN KEY("sentenceId")REFERENCES "sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
