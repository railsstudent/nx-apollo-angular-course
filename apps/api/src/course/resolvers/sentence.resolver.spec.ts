import { Test, TestingModule } from '@nestjs/testing'
import { TranslationService, SentenceService, UniqueHelper } from '../services'
import { SentenceResolver } from './sentence.resolver'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { Language, Sentence } from '../entities'
import { AddSentenceInput, UpdateSentenceInput } from '../dto'

describe('SentenceResolver', () => {
  let resolver: SentenceResolver
  let sentenceService: SentenceService
  let translationService: TranslationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentenceResolver,
        SentenceService,
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

    resolver = module.get<SentenceResolver>(SentenceResolver)
    sentenceService = module.get<SentenceService>(SentenceService)
    translationService = module.get<TranslationService>(TranslationService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should get sentence', async () => {
    const result: Sentence = {
      id: '1',
      text: 'Sentence 1',
      lesson: {
        id: '1',
        name: 'lesson name',
      },
    }

    const sentenceId = '1'

    jest.spyOn(sentenceService, 'getSentence').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.getSentence(sentenceId)).toEqual(result)
  })

  it('should add sentence', async () => {
    const result: Sentence = {
      id: '1',
      text: 'new sentence',
      lesson: {
        id: '1',
        name: 'lesson name',
      },
    }

    const input: AddSentenceInput = {
      text: 'new sentence',
      lessonId: '1',
    }

    jest.spyOn(sentenceService, 'addSentence').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.addSentence(input)).toEqual(result)
  })

  it('should update sentence', async () => {
    const result: Sentence = {
      id: '1',
      text: 'mod sentence',
      lesson: {
        id: '1',
        name: 'lesson name',
      },
    }

    const input: UpdateSentenceInput = {
      id: '1',
      text: 'mod sentence',
    }

    jest.spyOn(sentenceService, 'updateSentence').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.updateSentence(input)).toEqual(result)
  })

  it('should get language of translations of a sentence', async () => {
    const result: Language[] = [
      {
        id: '1',
        name: 'English',
        nativeName: 'English',
      },
      {
        id: '2',
        name: 'Chinese',
        nativeName: '中文',
      },
    ]

    const input: Sentence = {
      id: '1',
      text: 'mod sentence',
    }

    jest.spyOn(translationService, 'getAvailableTranslations').mockImplementation(() => Promise.resolve(result))
    expect(await resolver.availableTranslations(input)).toEqual(result)
  })
})
