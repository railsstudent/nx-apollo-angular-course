import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { Language, Translation } from '../entities'
import { AddLanguageInput, AddTranslationInput, UpdateLanguageInput } from '../dto'
import { UniqueHelper } from './unique.helper'
import { UserInputError, ValidationError } from 'apollo-server-express'

@Injectable()
export class TranslationService {
  constructor(private readonly service: PrismaService, private readonly uniqueHelper: UniqueHelper) {}

  async getTranslations(sentenceId: string): Promise<Translation[]> {
    return this.service.translation.findMany({
      where: {
        sentenceId,
      },
      orderBy: [
        {
          text: 'asc',
        },
      ],
      include: {
        language: true,
        sentence: true,
      },
    })
  }

  async addTranslation(input: AddTranslationInput): Promise<Translation> {
    const { text, languageId, sentenceId } = input

    await this.uniqueHelper.findUniqueLanguage({ id: languageId }, true)

    const sentence = await this.service.sentence.findUnique({
      where: {
        id: sentenceId,
      },
      include: {
        translations: true,
      },
      rejectOnNotFound: true,
    })

    const duplicatedLang = sentence.translations.some((translation) => translation?.languageId === languageId)
    if (duplicatedLang) {
      const language = await this.uniqueHelper.findUniqueLanguage({ id: languageId }, true)
      throw new ValidationError(`${language?.name} translation already exists`)
    }

    const duplTranslation = sentence.translations.find((translation) => translation?.text === text)
    if (duplTranslation) {
      const language = await this.uniqueHelper.findUniqueLanguage({ id: duplTranslation.languageId }, true)
      throw new ValidationError(`${duplTranslation?.text} is found in ${language?.name} translation`)
    }

    return await this.service.translation.create({
      data: {
        text,
        languageId,
        sentenceId,
      },
      include: {
        sentence: true,
        language: true,
      },
    })
  }

  async getLanguages(): Promise<Language[]> {
    return this.service.language.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    })
  }

  async addLanguage(input: AddLanguageInput): Promise<Language> {
    const { name, nativeName, flag = '', shinyFlag = '' } = input

    const existingLanguage = await this.service.language.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    })

    if (existingLanguage) {
      throw new UserInputError(`${name} is already added`)
    }

    return this.service.language.create({
      data: {
        name,
        nativeName,
        flag,
        shinyFlag,
      },
    })
  }

  async updateLanguage(input: UpdateLanguageInput): Promise<Language> {
    const { id, ...rest } = input

    await this.uniqueHelper.findUniqueLanguage({ id }, true)

    const language = await this.service.language.findFirst({
      where: {
        AND: [
          {
            ...rest,
          },
        ],
        NOT: [
          {
            id: {
              equals: id,
            },
          },
        ],
      },
    })

    if (language) {
      const { name = '', nativeName = '' } = rest
      const pair = `${name}${name && nativeName ? '/' : ''}${nativeName}`
      throw new ValidationError(`${pair} already exists`)
    }

    return this.service.language.update({
      data: {
        ...rest,
      },
      where: {
        id,
      },
    })
  }

  async getAvailableTranslations(sentenceId: string): Promise<Language[]> {
    const translations = await this.service.translation.findMany({
      where: {
        sentenceId,
      },
      include: {
        language: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    const languages: Language[] = translations.map((translation) => translation.language)
    return languages
  }

  async getTranslation(sentenceId: string, languageId: string): Promise<Translation> {
    return this.service.translation.findFirst({
      where: {
        sentenceId,
        languageId,
      },
      include: {
        language: true,
      },
    })
  }

  async deleteTranslation(translationId: string): Promise<Translation> {
    const count = await this.service.translation.count({
      where: {
        id: translationId,
      },
    })

    if (count <= 0) {
      throw new UserInputError(`Translaton id ${translationId} does not exist`)
    }

    return this.service.translation.delete({
      where: {
        id: translationId,
      },
      include: {
        language: true,
      },
    })
  }
}
