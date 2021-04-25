import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import {
  AddLessonInput,
  UpdateLessonInput,
  SentenceService,
  LessonService,
  GetSentenceArgs,
} from '../../api/src/course'
import { AppModule } from '../../api/src/app'

const lessonService = {
  getLesson(id: string) {
    return {
      id,
      name: 'lesson',
      course: {
        id: '2',
        name: 'course',
        description: 'course description',
      },
    }
  },

  addLesson(input: AddLessonInput) {
    const { name, courseId } = input
    return {
      id: '10',
      name,
      course: {
        id: courseId,
      },
    }
  },

  updateLesson(input: UpdateLessonInput) {
    const { name, id } = input
    return {
      id,
      name,
    }
  },
}

const sentenceService = {
  getPaginatedSentences(args: GetSentenceArgs) {
    const { lessonId } = args
    return {
      cursor: 1000,
      sentences: [
        {
          id: '1',
          text: 'sentence 1',
          lesson: {
            id: lessonId,
          },
        },
      ],
    }
  },
}

describe('LessonResolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SentenceService)
      .useValue(sentenceService)
      .overrideProvider(LessonService)
      .useValue(lessonService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/graphql (POST) getLesson', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          getLesson(id: "1") {
            id
            name
            course {
              id
              name
              description
            }
            paginatedSentences(args: { cursor: -1, limit: 2 }) {
              cursor
              sentences {
                id
                text
              }
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { getLesson },
        } = body
        expect(getLesson).toEqual({
          id: '1',
          name: 'lesson',
          course: {
            id: '2',
            name: 'course',
            description: 'course description',
          },
          paginatedSentences: {
            cursor: 1000,
            sentences: [
              {
                id: '1',
                text: 'sentence 1',
              },
            ],
          },
        })
      })
  })

  it('/graphql (POST) addLesson', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          addLesson (newLesson: {
            name: "new lesson",
            courseId: "2"
          }) {
            id
            name
            course {
              id
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { addLesson },
        } = body
        expect(addLesson).toEqual({
          id: '10',
          name: 'new lesson',
          course: {
            id: '2',
          },
        })
      })
  })

  it('/graphql (POST) updateLesson', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          updateLesson (updateLesson: {
            id: "1",
            name: "mod lesson",
          }) {
            id
            name
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { updateLesson },
        } = body
        expect(updateLesson).toEqual({
          id: '1',
          name: 'mod lesson',
        })
      })
  })
})
