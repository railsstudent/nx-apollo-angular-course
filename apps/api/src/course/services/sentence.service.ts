import { ValidationError } from 'apollo-server-express'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { AddSentenceInput, GetSentenceArgs, UpdateSentenceInput } from '../dto'
import { Sentence, DeletedSentence, Translation, PaginatedItems } from '../entities'
import { UniqueHelper } from './unique.helper'

@Injectable()
export class SentenceService {
  constructor(private readonly service: PrismaService, private uniqueHelper: UniqueHelper) {}

  async addSentence(input: AddSentenceInput): Promise<Sentence> {
    const { text, lessonId } = input

    const lesson = await this.uniqueHelper.findUniqueLesson({ id: lessonId }, true)
    const sentence = await this.service.sentence.findFirst({
      where: {
        text,
        lessonId,
      },
    })

    if (sentence) {
      throw new ValidationError(`${text} is found in ${lesson?.name} lesson`)
    }

    return this.service.sentence.create({
      data: {
        text,
        lessonId,
      },
      include: {
        lesson: true,
      },
    })
  }

  async updateSentence(input: UpdateSentenceInput): Promise<Sentence> {
    const { id, ...rest } = input

    if (rest.lessonId) {
      await this.uniqueHelper.findUniqueLesson({ id: rest.lessonId }, true)
    }

    await this.service.sentence.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })

    const sentence = await this.service.sentence.findFirst({
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
      include: {
        lesson: true,
      },
    })

    if (sentence) {
      const { text = '' } = rest
      throw new ValidationError(`${text} is found in ${sentence?.lesson?.name} lesson`)
    }

    return this.service.sentence.update({
      data: {
        ...rest,
        updatedAt: new Date(Date.now()),
      },
      where: {
        id,
      },
      include: {
        lesson: true,
      },
    })
  }

  async getPaginatedSentences(args: GetSentenceArgs): Promise<PaginatedItems> {
    const { lessonId, cursor, limit: take } = args || {}
    const where =
      cursor < 0
        ? {
            lessonId,
          }
        : {
            lessonId,
            createdAt: {
              gt: new Date(cursor),
            },
          }

    const sentences = await this.service.sentence.findMany({
      where,
      take,
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      include: {
        lesson: true,
        translations: {
          include: {
            language: true,
          },
        },
      },
    })

    const nextCursor = sentences && sentences.length > 0 ? sentences[sentences.length - 1].createdAt.getTime() : -1

    return {
      cursor: nextCursor,
      sentences,
    }
  }

  async getSentence(sentenceId: string): Promise<Sentence> {
    return this.service.sentence.findUnique({
      where: {
        id: sentenceId,
      },
      rejectOnNotFound: true,
      include: {
        lesson: true,
        translations: {
          include: {
            language: true,
          },
        },
      },
    })
  }

  async deleteSentence(sentenceId: string): Promise<DeletedSentence> {
    const sentence = await this.getSentence(sentenceId)

    const deleteTranslations = (sentence?.translations || []).map((translation) =>
      this.service.translation.delete({
        where: {
          id: translation.id,
        },
      }),
    )

    const deleteSentence = this.service.sentence.delete({
      where: {
        id: sentenceId,
      },
    })

    const results = await this.service.$transaction([...deleteTranslations, deleteSentence])

    const firstSentence = (results.splice(-1) as unknown) as Sentence[]
    const restTranslations = (results as unknown) as Translation[]

    return {
      sentence: firstSentence[0],
      translations: restTranslations,
    }
  }
}
