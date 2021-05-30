import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { CourseService, LessonService, UniqueHelper } from '../services'
import { CourseResolver } from './course.resolver'
import { AddCourseInput, CursorPaginationArgs, UpdateCourseInput } from '../dto'
import { Course, PaginatedItems } from '../entities'
import { GqlThrottlerGuard } from '@nx-apollo-angular-course/gql'
import { ThrottlerModule } from '@nestjs/throttler'

describe('CourseResolver', () => {
  let resolver: CourseResolver
  let courseService: CourseService
  let lessonService: LessonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({
          ttl: 60,
          limit: 100,
        }),
      ],
      providers: [
        CourseResolver,
        CourseService,
        LessonService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: UniqueHelper,
          useValue: {},
        },
        {
          provide: GqlThrottlerGuard,
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<CourseResolver>(CourseResolver)
    courseService = module.get<CourseService>(CourseService)
    lessonService = module.get<LessonService>(LessonService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('course return a course', async () => {
    const result = {
      id: '1',
      name: 'course name',
      description: 'course description',
    }
    jest.spyOn(courseService, 'getCourse').mockImplementation(() => Promise.resolve(result))

    expect(await resolver.course('1')).toEqual(result)
  })

  it('addCourse should create and return a new course', async () => {
    const input: AddCourseInput = {
      name: 'new course',
      description: 'new course description',
      languageId: '1',
    }
    const result = {
      id: '1',
      name: input.name,
      description: input.description,
    }
    jest.spyOn(courseService, 'addCourse').mockImplementation(() => Promise.resolve(result))

    expect(await resolver.addCourse(input)).toEqual(result)
  })

  it('updateCourse should update and return a course', async () => {
    const input: UpdateCourseInput = {
      id: '1',
      name: 'new course mod',
      description: 'new course description mod',
    }
    const result = {
      id: '1',
      name: input.name,
      description: input.description,
    }
    jest.spyOn(courseService, 'updateCourse').mockImplementation(() => Promise.resolve(result))

    expect(await resolver.updateCourse(input)).toEqual(result)
  })

  it('paginatedLessons should return next batch of lessons', async () => {
    const input: Course = {
      id: '1',
      name: 'new course mod',
      description: 'new course description mod',
    }

    const result: PaginatedItems = {
      cursor: 10000,
      courses: [],
    }

    const args: CursorPaginationArgs = {
      cursor: -1,
      limit: 3,
    }

    jest.spyOn(lessonService, 'getPaginatedLessons').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.paginatedLessons(input, args)).toEqual(result)
  })
})
