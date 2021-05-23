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
    flag: 'https://www.countryflags.io/us/flat/64.png',
    shinyFlag: 'https://www.countryflags.io/us/shiny/64.png',
  },
  {
    id: '2',
    name: 'Spanish',
    nativeName: 'Espanol',
    flag: 'https://www.countryflags.io/es/flat/64.png',
    shinyFlag: 'https://www.countryflags.io/us/shiny/64.png',
  },
]
const translationService = {
  getLanguages() {
    return languages
  },

  addLanguage(input: AddLanguageInput) {
    const { name, nativeName, flag, shinyFlag } = input
    return {
      id: '10',
      name,
      nativeName,
      fullname: `${name} (${nativeName})`,
      flag,
      shinyFlag,
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
            flag
            shinyFlag
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
            nativeName: "Portugese",
            flag: "https://www.countryflags.io/br/flat/64.png",
            shinyFlag: "https://www.countryflags.io/br/shiny/64.png",
          }) {
            id
            name
            nativeName
            fullname
            flag
            shinyFlag
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
          flag: 'https://www.countryflags.io/br/flat/64.png',
          shinyFlag: 'https://www.countryflags.io/br/shiny/64.png',
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
            flag: "https://www.countryflags.io/br/flat/64.png",
            shinyFlag: "https://www.countryflags.io/br/shiny/64.png",
          }) {
            id
            name
            nativeName
            fullname
            flag
            shinyFlag
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
          flag: 'https://www.countryflags.io/br/flat/64.png',
          shinyFlag: 'https://www.countryflags.io/br/shiny/64.png',
        })
      })
  })
})
