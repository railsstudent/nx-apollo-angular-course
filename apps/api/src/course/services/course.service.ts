import { UserInputError } from 'apollo-server-express'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { AddCourseInput, CursorPaginationArgs, UpdateCourseInput } from '../dto'
import { Course, PaginatedItems } from '../entities'

@Injectable()
export class CourseService {
  constructor(private readonly service: PrismaService) {}

  async getCourses(args: CursorPaginationArgs): Promise<PaginatedItems> {
    const { cursor, limit: take } = args || {}

    const where =
      cursor < 0
        ? null
        : {
            createdAt: {
              gt: new Date(cursor),
            },
          }

    const baseOptions = {
      take,
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      include: {
        language: true,
      },
    }
    const findOptions: any = where ? { ...baseOptions, where } : baseOptions
    const courses = await this.service.course.findMany(findOptions)
    const nextCursor = courses && courses.length > 0 ? courses[courses.length - 1].createdAt.getTime() : -1

    return {
      cursor: nextCursor,
      courses,
    }
  }
}
