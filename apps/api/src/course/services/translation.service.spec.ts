import { UniqueHelper } from './unique.helper'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { SentenceService } from './sentence.service'
import { TranslationService } from './translation.service'

describe('TranslationService', () => {
  let service: TranslationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranslationService,
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

    service = module.get<TranslationService>(TranslationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
