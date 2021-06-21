import { UniqueHelper } from './unique.helper'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../prisma'
import { LessonService } from './lesson.service'

describe('LessonService', () => {
  let service: LessonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
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

    service = module.get<LessonService>(LessonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
