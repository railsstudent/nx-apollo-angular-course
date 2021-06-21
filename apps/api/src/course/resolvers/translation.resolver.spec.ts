import { Test, TestingModule } from '@nestjs/testing'
import { TranslationService, UniqueHelper } from '../services'
import { PrismaService } from '../../prisma'
import { Translation } from '../entities'
import { AddTranslationInput } from '../dto'
import { TranslationResolver } from './translation.resolver'
import { GqlThrottlerGuard } from '../../gql'
import { ThrottlerModule } from '@nestjs/throttler'

describe('SentenceResolver', () => {
  let resolver: TranslationResolver
  let translationService: TranslationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({
          ttl: 60,
          limit: 100,
        }),
      ],
      providers: [
        TranslationResolver,
        TranslationService,
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

    resolver = module.get<TranslationResolver>(TranslationResolver)
    translationService = module.get<TranslationService>(TranslationService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should get translation', async () => {
    const result: Translation = {
      id: '1',
      text: 'Translation 1',
      sentence: {
        id: '1',
        text: 'sentence',
      },
      language: {
        id: '1',
        name: 'English',
        nativeName: 'English',
      },
    }

    const sentenceId = '1'
    const languageId = '1'

    jest.spyOn(translationService, 'getTranslation').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.getTranslation(sentenceId, languageId)).toEqual(result)
  })

  it('should add translation', async () => {
    const result: Translation = {
      id: '1',
      text: 'new translation',
      sentence: {
        id: '1',
        text: 'sentence',
      },
      language: {
        id: '1',
        name: 'English',
        nativeName: 'English',
      },
    }

    const input: AddTranslationInput = {
      text: 'new sentence',
      sentenceId: '1',
      languageId: '1',
    }

    jest.spyOn(translationService, 'addTranslation').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.addTranslation(input)).toEqual(result)
  })

  it('should delete translation', async () => {
    const result: Translation = {
      id: '1',
      text: 'new translation',
      language: {
        id: '1',
        name: 'English',
        nativeName: 'English',
      },
    }

    const translationId = '1'

    jest.spyOn(translationService, 'deleteTranslation').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.deleteTranslation(translationId)).toEqual(result)
  })
})
