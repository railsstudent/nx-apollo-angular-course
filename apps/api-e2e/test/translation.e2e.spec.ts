import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TranslationService, AddTranslationInput } from '../../api/src/course'
import { AppModule } from '../../api/src/app'

const translationService = {
  getTranslation(sentenceId: string, languageId: string) {
    return {
      id: '1',
      text: 'translation',
      sentence: {
        id: sentenceId,
      },
      language: {
        id: languageId,
      },
    }
  },

  addTranslation(input: AddTranslationInput) {
    const { text, sentenceId, languageId } = input
    return {
      id: '10',
      text,
      sentence: {
        id: sentenceId,
      },
      language: {
        id: languageId,
      },
    }
  },

  deleteTranslation(id: string) {
    return {
      id,
    }
  },
}

describe('TranslationResolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TranslationService)
      .useValue(translationService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/graphql (POST) getTranslation', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          getTranslation(sentenceId: "2", languageId: "3") {
            id
            text
            sentence {
              id
            }
            language {
              id
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { getTranslation },
        } = body
        expect(getTranslation).toEqual({
          id: '1',
          text: 'translation',
          sentence: {
            id: '2',
          },
          language: {
            id: '3',
          },
        })
      })
  })

  it('/graphql (POST) addTranslation', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          addTranslation (newTranslation: {
            text: "new translation",
            sentenceId: "2",
            languageId: "3"
          }) {
            id
            text
            sentence {
              id
            }
            language {
              id
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { addTranslation },
        } = body
        expect(addTranslation).toEqual({
          id: '10',
          text: 'new translation',
          sentence: {
            id: '2',
          },
          language: {
            id: '3',
          },
        })
      })
  })

  it('/graphql (POST) deleteTranslation', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          deleteTranslation (id: "1") {
            id
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { deleteTranslation },
        } = body
        expect(deleteTranslation).toEqual({
          id: '1',
        })
      })
  })
})
