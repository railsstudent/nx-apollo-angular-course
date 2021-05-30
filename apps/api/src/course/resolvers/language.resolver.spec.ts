import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { TranslationService, UniqueHelper } from '../services'
import { LanguageResolver } from './language.resolver'
import { Language } from '../entities'
import { AddLanguageInput, UpdateLanguageInput } from '../dto'
import { GqlThrottlerGuard } from '@nx-apollo-angular-course/gql'
import { ThrottlerModule } from '@nestjs/throttler'

describe('LanguageResolver', () => {
  let resolver: LanguageResolver
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
        {
          provide: GqlThrottlerGuard,
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

  it('getLanguages should return all languages', async () => {
    const result: Language[] = [
      {
        id: '1',
        name: 'English',
        nativeName: 'English',
        fullname: 'English (English)',
        flag: 'https://www.countryflags.io/us/flat/64.png',
        shinyFlag: 'https://www.countryflags.io/us/flat/64.png',
      },
      {
        id: '2',
        name: 'Spanish',
        nativeName: 'Espanol',
        fullname: 'Spanish (Espanol)',
        flag: 'https://www.countryflags.io/es/flat/64.png',
        shinyFlag: 'https://www.countryflags.io/us/flat/64.png',
      },
      {
        id: '3',
        name: 'Chinese',
        nativeName: '中文',
        fullname: 'Chinese (中文)',
        flag: 'https://www.countryflags.io/hk/flat/64.png',
        shinyFlag: 'https://www.countryflags.io/us/flat/64.png',
      },
    ]
    jest.spyOn(translationService, 'getLanguages').mockImplementation(() => Promise.resolve(result))

    expect(await resolver.getLanguages()).toEqual(result)
  })

  it('addLanguage should create and return a language with default flag', async () => {
    const newLanguageInput: AddLanguageInput = {
      name: 'English',
      nativeName: 'English',
    }

    const newLanguage: Language = {
      ...newLanguageInput,
      id: '1',
      fullname: 'English (English)',
      flag: '',
      shinyFlag: '',
    }
    jest.spyOn(translationService, 'addLanguage').mockImplementation(() => Promise.resolve(newLanguage))

    expect(await resolver.addLanguage(newLanguageInput)).toEqual(newLanguage)
  })

  it('addLanguage should create and return a language with flag', async () => {
    const flag = 'https://www.countryflags.io/us/flat/64.png'
    const shinyFlag = 'https://www.countryflags.io/us/shiny/64.png'
    const newLanguageInput: AddLanguageInput = {
      name: 'English',
      nativeName: 'English',
      flag,
      shinyFlag,
    }

    const newLanguage: Language = {
      ...newLanguageInput,
      id: '1',
      fullname: 'English (English)',
      flag,
      shinyFlag,
    }
    jest.spyOn(translationService, 'addLanguage').mockImplementation(() => Promise.resolve(newLanguage))

    expect(await resolver.addLanguage(newLanguageInput)).toEqual(newLanguage)
  })

  it('updateLanguage should update and return a language', async () => {
    const updateLanguageInput: UpdateLanguageInput = {
      id: '1',
      name: 'English mod',
      nativeName: 'English mod',
      flag: 'flag mod',
      shinyFlag: 'shinyFlag mod',
    }

    const updateLanguage: Language = {
      ...updateLanguageInput,
      id: '1',
      fullname: 'English (English)',
    }
    jest.spyOn(translationService, 'updateLanguage').mockImplementation(() => Promise.resolve(updateLanguage))

    expect(await resolver.updateLanguage(updateLanguageInput)).toEqual(updateLanguage)
  })

  it('fullname should return the concatenation of name and nativeName', async () => {
    const language: Language = {
      id: '1',
      name: 'English',
      nativeName: 'English',
    }
    expect(await resolver.fullname(language)).toEqual('English (English)')
  })
})
