import { Test, TestingModule } from '@nestjs/testing'
import { TranslationService, SentenceService } from '../services'
import { SentenceResolver } from './sentence.resolver'

describe('SentenceResolver', () => {
  let resolver: SentenceResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentenceResolver,
        {
          provide: TranslationService,
          useValue: {},
        },
        {
          provide: SentenceService,
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<SentenceResolver>(SentenceResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
