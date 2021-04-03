import { Injectable } from '@nestjs/common'
import { PrismaService } from './../../prisma'
import { Prisma } from '@prisma/client'

@Injectable()
export class UniqueHelper {
  constructor(private readonly service: PrismaService) {}

  async findUniqueLanguage(where: Prisma.languageWhereUniqueInput, rejectOnNotFound = false) {
    return this.service.language.findUnique({
      where,
      rejectOnNotFound,
    })
  }

  async findUniqueCourse(
    where: Prisma.courseWhereUniqueInput,
    include: Prisma.courseInclude | null,
    rejectOnNotFound = false,
  ) {
    return this.service.course.findUnique({
      where,
      include,
      rejectOnNotFound,
    })
  }

  async findUniqueLesson(where: Prisma.lessonWhereUniqueInput, rejectOnNotFound = false) {
    return this.service.lesson.findUnique({
      where,
      rejectOnNotFound,
    })
  }
}
