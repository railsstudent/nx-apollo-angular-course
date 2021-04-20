import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@nx-apollo-angular-course/prisma'
import { TranslationService, UniqueHelper } from '../services'
import { LanguageResolver } from './language.resolver'
import { Language } from '../entities'
import { AddLanguageInput, UpdateLanguageInput } from '../dto'

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

  it('getLanguages should return all languages', async () => {
    const result: Language[] = [
      {
        id: '1',
        name: 'English',
        nativeName: 'English',
        fullname: 'English (English)',
      },
      {
        id: '2',
        name: 'Spanish',
        nativeName: 'Espanol',
        fullname: 'Spanish (Espanol)',
      },
    ]
    jest.spyOn(translationService, 'getLanguages').mockImplementation(() => Promise.resolve(result))

    expect(await resolver.getLanguages()).toEqual(result)
  })

  it('addLanguage should create and return a language', async () => {
    const newLanguageInput: AddLanguageInput = {
      name: 'English',
      nativeName: 'English',
    }

    const newLanguage: Language = {
      ...newLanguageInput,
      id: '1',
      fullname: 'English (English)',
    }
    jest.spyOn(translationService, 'addLanguage').mockImplementation(() => Promise.resolve(newLanguage))

    expect(await resolver.addLanguage(newLanguageInput)).toEqual(newLanguage)
  })

  it('updateLanguage should update and return a language', async () => {
    const updateLanguageInput: UpdateLanguageInput = {
      id: '1',
      name: 'English mod',
      nativeName: 'English mod',
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
