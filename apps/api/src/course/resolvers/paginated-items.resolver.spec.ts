import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { CursorPaginationArgs } from '../dto'
import { CourseService, LessonService, SentenceService, UniqueHelper } from '../services'
import { PaginatedItemsResolver } from './paginated-items.resolver'
import { PaginatedItems } from '../entities'
import { GqlThrottlerGuard } from '@nx-apollo-angular-course/gql'
import { ThrottlerModule } from '@nestjs/throttler'

describe('PaginatedItemsResolver', () => {
  let resolver: PaginatedItemsResolver
  let courseService: CourseService
  let lessonService: LessonService
  let sentenceService: SentenceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({
          ttl: 60,
          limit: 100,
        }),
      ],
      providers: [
        PaginatedItemsResolver,
        CourseService,
        LessonService,
        SentenceService,
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

    resolver = module.get<PaginatedItemsResolver>(PaginatedItemsResolver)
    courseService = module.get<CourseService>(CourseService)
    lessonService = module.get<LessonService>(LessonService)
    sentenceService = module.get<SentenceService>(SentenceService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should paginate courses', async () => {
    const result: PaginatedItems = {
      cursor: 1000,
      courses: [
        {
          id: '1',
          name: 'Course name',
          description: 'Course description',
        },
      ],
    }

    const args: CursorPaginationArgs = {
      cursor: -1,
      limit: 2,
    }

    jest.spyOn(courseService, 'getCourses').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.courses(args)).toEqual(result)
  })

  it('should paginate lessons', async () => {
    const result: PaginatedItems = {
      cursor: 1000,
      lessons: [
        {
          id: '1',
          name: 'Course name',
          course: {
            id: '1',
            name: 'course name',
            description: 'course description',
          },
        },
        {
          id: '2',
          name: 'Course name',
          course: {
            id: '1',
            name: 'course name',
            description: 'course description',
          },
        },
      ],
    }

    const args: CursorPaginationArgs = {
      cursor: -1,
      limit: 2,
    }

    const courseId = '1'

    jest.spyOn(lessonService, 'getPaginatedLessons').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.nextLessons(courseId, args)).toEqual(result)
  })

  it('should paginate sentences', async () => {
    const result: PaginatedItems = {
      cursor: 1000,
      sentences: [
        {
          id: '1',
          text: 'Sentence 1',
          lesson: {
            id: '1',
            name: 'lesson name',
          },
        },
        {
          id: '2',
          text: 'Sentence 2',
          lesson: {
            id: '1',
            name: 'lesson name',
          },
        },
      ],
    }

    const args: CursorPaginationArgs = {
      cursor: -1,
      limit: 2,
    }

    const lessonId = '1'

    jest.spyOn(sentenceService, 'getPaginatedSentences').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.nextSentences(lessonId, args)).toEqual(result)
  })
})
