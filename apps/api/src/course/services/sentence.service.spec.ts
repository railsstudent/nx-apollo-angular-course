import { UniqueHelper } from './unique.helper'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { LessonService } from './lesson.service'
import { SentenceService } from './sentence.service'

describe('SentenceService', () => {
  let service: SentenceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentenceService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: UniqueHelper,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<SentenceService>(SentenceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
