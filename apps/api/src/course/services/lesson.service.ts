import { UserInputError, ValidationError } from 'apollo-server-express'
import { PrismaService } from '../../prisma'
import { Injectable } from '@nestjs/common'
import { AddLessonInput, GetLessonArgs, UpdateLessonInput } from '../dto'
import { PaginatedItems } from '../entities/paginated-items.entity'
import { UniqueHelper } from './unique.helper'
import { Lesson } from '../entities/lesson.entity'

@Injectable()
export class LessonService {
  constructor(private readonly service: PrismaService, private readonly uniqueHelper: UniqueHelper) {}

  async getPaginatedLessons(args: GetLessonArgs): Promise<PaginatedItems> {
    const { courseId, cursor, limit: take } = args
    const where =
      cursor < 0
        ? {
            courseId,
          }
        : {
            courseId,
            createdAt: {
              gt: new Date(cursor),
            },
          }

    const lessons = await this.service.lesson.findMany({
      where,
      take,
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      include: {
        course: true,
      },
    })

    const nextCursor = lessons && lessons.length > 0 ? lessons[lessons.length - 1].createdAt.getTime() : -1

    return {
      cursor: nextCursor,
      lessons,
    }
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.service.lesson.findUnique({
      where: {
        id,
      },
      include: {
        course: {
          include: {
            language: true,
          },
        },
      },
      rejectOnNotFound: true,
    })

    const totalSentences = await this.service.sentence.count({
      where: {
        lessonId: id,
      },
    })

    return {
      ...lesson,
      totalSentences,
    }
  }

  async addLesson(input: AddLessonInput): Promise<Lesson> {
    const { name, courseId } = input

    await this.uniqueHelper.findUniqueCourse({ id: courseId }, null, true)

    const lesson = await this.service.lesson.findFirst({
      where: {
        name: {
          equals: name,
        },
        courseId: {
          equals: courseId,
        },
      },
    })

    if (lesson) {
      throw new UserInputError('Lesson name is already used')
    }

    return this.service.lesson.create({
      data: {
        name,
        courseId,
      },
      include: {
        course: true,
      },
    })
  }

  async updateLesson(input: UpdateLessonInput): Promise<Lesson> {
    const { id, name } = input

    const existingLesson = await this.service.lesson.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
      },
      rejectOnNotFound: true,
    })

    const courseId = existingLesson?.course?.id || ''
    const duplicatedLesson = await this.service.lesson.findFirst({
      where: {
        AND: [
          {
            name: {
              equals: name,
            },
            courseId: {
              equals: courseId,
            },
          },
        ],
        NOT: [
          {
            id: {
              equals: id,
            },
          },
        ],
      },
    })

    if (duplicatedLesson) {
      throw new ValidationError('Cannot update, lesson name is already used')
    }

    return this.service.lesson.update({
      data: {
        name,
        updatedAt: new Date(Date.now()),
      },
      where: {
        id,
      },
      include: {
        course: true,
      },
    })
  }
}
