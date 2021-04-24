import { Injectable } from '@nestjs/common'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { Prisma } from '@prisma/client'

@Injectable()
export class UniqueHelper {
  constructor(private readonly service: PrismaService) {}

  async findUniqueLanguage(where: { id: string }, rejectOnNotFound = false) {
    return this.service.language.findUnique({
      where,
      rejectOnNotFound,
    })
  }

  async findUniqueCourse(
    where: { id?: string, name?: string },
    include: Prisma.courseInclude | null,
    rejectOnNotFound = false,
  ) {
    return this.service.course.findUnique({
      where,
      include,
      rejectOnNotFound,
    })
  }

  async findUniqueLesson(where: { id: string }, rejectOnNotFound = false) {
    return this.service.lesson.findUnique({
      where,
      rejectOnNotFound,
    })
  }
}
