import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TranslationService, AddLanguageInput, UpdateLanguageInput } from '../../api/src/course'
import { AppModule } from '../../api/src/app'

const languages = [
  {
    id: '1',
    name: 'English',
    nativeName: 'English',
  },
  {
    id: '2',
    name: 'Spanish',
    nativeName: 'Espanol',
  },
]
const translationService = {
  getLanguages() {
    return languages
  },

  addLanguage(input: AddLanguageInput) {
    const { name, nativeName } = input
    return {
      id: '10',
      name,
      nativeName,
      fullname: `${name} (${nativeName})`,
    }
  },

  updateLanguage(input: UpdateLanguageInput) {
    return {
      ...input,
      fullname: `${input.name} (${input.nativeName})`,
    }
  },
}

describe('LanguageResolver (e2e)', () => {
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

  it('/graphql (POST) getLanguages', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          getLanguages {
            id
            name
            nativeName
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { getLanguages },
        } = body
        expect(getLanguages).toEqual(languages)
      })
  })

  it('/graphql (POST) addLanguage', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          addLanguage (newLanguage: {
            name: "Portuguese",
            nativeName: "Portugese"
          }) {
            id
            name
            nativeName
            fullname
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { addLanguage },
        } = body
        expect(addLanguage).toEqual({
          id: '10',
          name: 'Portuguese',
          nativeName: 'Portugese',
          fullname: 'Portuguese (Portugese)',
        })
      })
  })

  it('/graphql (POST) updateLanguage', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          updateLanguage (updateLanguage: {
            id: "1",
            name: "Portuguese mod",
            nativeName: "Portugese mod"
          }) {
            id
            name
            nativeName
            fullname
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { updateLanguage },
        } = body
        expect(updateLanguage).toEqual({
          id: '1',
          name: 'Portuguese mod',
          nativeName: 'Portugese mod',
          fullname: 'Portuguese mod (Portugese mod)',
        })
      })
  })
})
