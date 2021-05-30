import { Test, TestingModule } from '@nestjs/testing'
import { SentenceService, UniqueHelper } from '../services'
import { DeletedSentenceResolver } from './deleted-sentence.resolver'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { DeletedSentence } from '../entities'
import { GqlThrottlerGuard } from '@nx-apollo-angular-course/gql'
import { ThrottlerModule } from '@nestjs/throttler'

describe('DeletedSentenceResolver', () => {
  let resolver: DeletedSentenceResolver
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
        {
          provide: GqlThrottlerGuard,
          useValue: {}
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
