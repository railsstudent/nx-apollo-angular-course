import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TranslationService, AddSentenceInput, SentenceService, UpdateSentenceInput } from '../../api/src/course'
import { AppModule } from '../../api/src/app'

const sentenceService = {
  getSentence(id: string) {
    return {
      id,
      text: 'sentence',
      lesson: {
        id: '2',
        name: 'lesson',
      },
    }
  },

  addSentence(input: AddSentenceInput) {
    const { text, lessonId } = input
    return {
      id: '10',
      text,
      lesson: {
        id: lessonId,
        name: 'lesson',
      },
    }
  },

  updateSentence(input: UpdateSentenceInput) {
    const { text, id, lessonId } = input
    return {
      id,
      text,
      lesson: {
        id: lessonId,
        name: 'lesson',
      },
    }
  },
}

const translationService = {
  getAvailableTranslations() {
    return [
      {
        id: '1',
        name: 'English',
        nativeName: 'English',
      },
      {
        id: '2',
        name: 'Chinese',
        nativeName: 'Chinese',
      },
    ]
  },
}

describe('SentenceResolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SentenceService)
      .useValue(sentenceService)
      .overrideProvider(TranslationService)
      .useValue(translationService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/graphql (POST) getSentence', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          getSentence(id: "1") {
            id
            text
            lesson {
              id
              name
            }
            availableTranslations {
              id
              name
              nativeName
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { getSentence },
        } = body
        expect(getSentence).toEqual({
          id: '1',
          text: 'sentence',
          lesson: {
            id: '2',
            name: 'lesson',
          },
          availableTranslations: [
            {
              id: '1',
              name: 'English',
              nativeName: 'English',
            },
            {
              id: '2',
              name: 'Chinese',
              nativeName: 'Chinese',
            },
          ],
        })
      })
  })

  it('/graphql (POST) addSentence', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          addSentence (newSentence: {
            text: "new sentence",
            lessonId: "2"
          }) {
            id
            text
            lesson {
              id
              name
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { addSentence },
        } = body
        expect(addSentence).toEqual({
          id: '10',
          text: 'new sentence',
          lesson: {
            id: '2',
            name: 'lesson',
          },
        })
      })
  })

  it('/graphql (POST) updateSentence', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          updateSentence (updateSentence: {
            id: "1",
            text: "mod sentence",
            lessonId: "2",
          }) {
            id
            text
            lesson {
              id
              name
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { updateSentence },
        } = body
        expect(updateSentence).toEqual({
          id: '1',
          text: 'mod sentence',
          lesson: {
            id: '2',
            name: 'lesson',
          },
        })
      })
  })
})
