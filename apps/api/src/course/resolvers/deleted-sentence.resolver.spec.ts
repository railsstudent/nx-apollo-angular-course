import { Test, TestingModule } from '@nestjs/testing'
import { SentenceService, UniqueHelper } from '../services'
import { DeletedSentenceResolver } from './deleted-sentence.resolver'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { DeletedSentence } from '../entities'

describe('DeletedSentenceResolver', () => {
  let resolver: DeletedSentenceResolver
  let sentenceService: SentenceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletedSentenceResolver,
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

    resolver = module.get<DeletedSentenceResolver>(DeletedSentenceResolver)
    sentenceService = module.get<SentenceService>(SentenceService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should delete sentence', async () => {
    const result: DeletedSentence = {
      sentence: {
        id: '1',
      },
      translations: [
        {
          id: '1',
          text: 'translation',
        },
      ],
    }

    const sentenceId = '1'

    jest.spyOn(sentenceService, 'deleteSentence').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.deleteSentence(sentenceId)).toEqual(result)
  })
})
