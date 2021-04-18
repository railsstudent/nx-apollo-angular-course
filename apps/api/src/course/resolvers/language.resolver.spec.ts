import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { TranslationService, UniqueHelper } from '../services'
import { LanguageResolver } from './language.resolver'
import { Language } from '../entities';
describe('LanguageResolver', () => {
  let resolver: LanguageResolver
  let translationService: TranslationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguageResolver,
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

    resolver = module.get<LanguageResolver>(LanguageResolver)
    translationService = module.get<TranslationService>(TranslationService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('getLanguages should return all courses', async () => {
    const result: Language[] = [
      {
        id: '1',
        name: 'English',
        nativeName: 'English',
        fullname: 'English (English)'
      },
      {
        id: '2',
        name: 'Spanish',
        nativeName: 'Espanol',
        fullname: 'Spanish (Espanol)'
      }
    ]
    jest.spyOn(translationService, 'getLanguages').mockImplementation(() => Promise.resolve([]))

    expect(await resolver.getLanguages()).toEqual(result)
  })
})
