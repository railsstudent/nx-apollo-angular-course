import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { SentenceService } from '../../api/src/course'
import { AppModule } from '../../api/src/app'

const sentenceService = {
  deleteSentence(id: string) {
    return {
      sentence: {
        id,
        text: 'deleted sentence',
      },
      translations: [
        {
          id: '1',
          text: 'translation 1',
          language: {
            id: '1',
            name: 'English',
            nativeName: 'English',
            fullname: 'English (English)',
          },
        },
      ],
    }
  },
}

describe('DeletedSentenceResolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SentenceService)
      .useValue(sentenceService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/graphql (POST) deleteSentence', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          deleteSentence(id: "1") {
            sentence {
              id
              text
            }
            translations {
              id
              text
              language {
                id
                name
                nativeName
                fullname
              }
            }
          }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { deleteSentence },
        } = body
        expect(deleteSentence).toEqual({
          sentence: {
            id: '1',
            text: 'deleted sentence',
          },
          translations: [
            {
              id: '1',
              text: 'translation 1',
              language: {
                id: '1',
                name: 'English',
                nativeName: 'English',
                fullname: 'English (English)',
              },
            },
          ],
        })
      })
  })
})
