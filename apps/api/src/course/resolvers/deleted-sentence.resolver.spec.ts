import { Test, TestingModule } from '@nestjs/testing'
import { SentenceService } from '../services'
import { LanguageResolver } from './language.resolver'
import { DeletedSentenceResolver } from './deleted-sentence.resolver'

describe('DeletedSentenceResolver', () => {
  let resolver: DeletedSentenceResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletedSentenceResolver,
        {
          provide: SentenceService,
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<DeletedSentenceResolver>(DeletedSentenceResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
