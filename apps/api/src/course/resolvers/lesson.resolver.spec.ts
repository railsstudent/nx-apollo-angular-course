import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../prisma'
import { LessonService, UniqueHelper, SentenceService } from '../services'
import { Lesson, PaginatedItems } from '../entities'
import { AddLessonInput, UpdateLessonInput, CursorPaginationArgs } from '../dto'
import { LessonResolver } from './lesson.resolver'
import { GqlThrottlerGuard } from '../../gql'
import { ThrottlerModule } from '@nestjs/throttler'

describe('LessonResolver', () => {
  let resolver: LessonResolver
  let sentenceService: SentenceService
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
        LessonResolver,
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

    resolver = module.get<LessonResolver>(LessonResolver)
    sentenceService = module.get<SentenceService>(SentenceService)
    lessonService = module.get<LessonService>(LessonService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('getLesson should return a lesson', async () => {
    const result: Lesson = {
      id: '1',
      name: 'Greeting',
      totalSentences: 8,
      course: {
        id: '1',
        name: 'English 101',
        description: 'English 101 description',
      },
    }

    const lessonId = '1'
    jest.spyOn(lessonService, 'getLesson').mockImplementation(() => Promise.resolve(result))

    expect(await resolver.getLesson(lessonId)).toEqual(result)
  })

  it('addLesson should create and return a lesson', async () => {
    const newLessonInput: AddLessonInput = {
      name: 'new lesson',
      courseId: '1',
    }

    const newLesson: Lesson = {
      id: '1',
      name: 'new lesson',
      course: {
        id: '1',
        name: 'English 101',
        description: 'English 101 description',
      },
    }
    jest.spyOn(lessonService, 'addLesson').mockImplementation(() => Promise.resolve(newLesson))

    expect(await resolver.addLesson(newLessonInput)).toEqual(newLesson)
  })

  it('updateLesson should update and return a language', async () => {
    const updateLessonInput: UpdateLessonInput = {
      id: '1',
      name: 'updated lesson',
      courseId: '1',
    }

    const updateLesson: Lesson = {
      id: '1',
      name: 'updated lesson',
      course: {
        id: '1',
        name: 'English 101',
        description: 'English 101 description',
      },
    }
    jest.spyOn(lessonService, 'updateLesson').mockImplementation(() => Promise.resolve(updateLesson))

    expect(await resolver.updateLesson(updateLessonInput)).toEqual(updateLesson)
  })

  it('paginatedSentences should return sentences belonging to the lesson', async () => {
    const items: PaginatedItems = {
      cursor: 1000,
      sentences: [],
    }

    const lesson: Lesson = {
      id: '1',
      name: 'lesson 1',
    }

    const args: CursorPaginationArgs = {
      cursor: -1,
      limit: 2,
    }
    jest.spyOn(sentenceService, 'getPaginatedSentences').mockImplementation(() => Promise.resolve(items))

    expect(await resolver.paginatedSentences(lesson, args)).toEqual(items)
  })
})
