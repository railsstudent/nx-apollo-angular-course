import { UniqueHelper } from './unique.helper'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../prisma'
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
