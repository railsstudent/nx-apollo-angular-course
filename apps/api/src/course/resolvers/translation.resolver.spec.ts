import { TranslationResolver } from './translation.resolver'
import { Test, TestingModule } from '@nestjs/testing'
import { TranslationService, SentenceService } from '../services'
import { SentenceResolver } from './sentence.resolver'

describe('SentenceResolver', () => {
  let resolver: TranslationResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranslationResolver,
        {
          provide: TranslationService,
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<TranslationResolver>(TranslationResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
