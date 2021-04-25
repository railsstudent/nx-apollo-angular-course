import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { LessonService, CourseService, GetLessonArgs, GetSentenceArgs, SentenceService } from '../../api/src/course'
import { AppModule } from '../../api/src/app'

const lessonService = {
  getPaginatedLessons(args: GetLessonArgs) {
    const { courseId } = args
    return {
      cursor: 1000,
      lessons: [
        {
          id: '1',
          name: 'lesson 1',
          course: {
            id: courseId,
          },
        },
      ],
    }
  },
}

const courseService = {
  getCourses() {
    return {
      cursor: 1000,
      courses: [
        {
          id: '1',
          name: 'course name',
          description: 'course description',
        },
      ],
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

describe('PaginatedItemsResolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(LessonService)
      .useValue(lessonService)
      .overrideProvider(CourseService)
      .useValue(courseService)
      .overrideProvider(SentenceService)
      .useValue(sentenceService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/graphql (POST) course', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          courses(args: { cursor: -1, limit: 2 }) {
            cursor
            courses {
              id
              name
              description
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { courses },
        } = body
        expect(courses).toEqual({
          cursor: 1000,
          courses: [
            {
              id: '1',
              name: 'course name',
              description: 'course description',
            },
          ],
        })
      })
  })

  it('/graphql (POST) nextLessons', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          nextLessons (courseId: "1", args: { cursor: -1, limit: 2 }) {
            cursor
            lessons {
              id
              name
              course {
                id
              }
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { nextLessons },
        } = body
        expect(nextLessons).toEqual({
          cursor: 1000,
          lessons: [
            {
              id: '1',
              name: 'lesson 1',
              course: {
                id: '1',
              },
            },
          ],
        })
      })
  })

  it('/graphql (POST) nextSentences', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          nextSentences (lessonId: "1", args: { cursor: -1, limit: 2 }) {
            cursor
            sentences {
              id
              text
              lesson {
                id
              }
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { nextSentences },
        } = body
        expect(nextSentences).toEqual({
          cursor: 1000,
          sentences: [
            {
              id: '1',
              text: 'sentence 1',
              lesson: {
                id: '1',
              },
            },
          ],
        })
      })
  })
})
