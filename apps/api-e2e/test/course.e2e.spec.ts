import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { LessonService, CourseService, AddCourseInput, UpdateCourseInput, GetLessonArgs } from '../../api/src/course'
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
  getCourse(id: string) {
    return {
      id,
      name: 'course',
      description: 'course description',
      language: {
        id: '1',
        name: 'English',
        nativeName: 'English',
        fullname: 'English (English)',
      },
    }
  },

  addCourse(input: AddCourseInput) {
    const { name, description, languageId } = input
    return {
      id: '10',
      name,
      description,
      language: {
        id: languageId,
      },
    }
  },

  updateCourse(input: UpdateCourseInput) {
    const { name, description, id } = input
    return {
      id,
      name,
      description,
    }
  },
}

describe('CourseResolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(LessonService)
      .useValue(lessonService)
      .overrideProvider(CourseService)
      .useValue(courseService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/graphql (POST) course', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          course(id: "1") {
            id
            name
            description
            language {
              id
              name
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { course },
        } = body
        expect(course).toEqual({
          id: '1',
          name: 'course',
          description: 'course description',
          language: {
            id: '1',
            name: 'English',
          },
        })
      })
  })

  it('/graphql (POST) course with lessons', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          course(id: "1") {
            id
            name
            description
            language {
              id
              name
              nativeName
              fullname
            }
            paginatedLessons (args: { cursor: -1, limit : 2 }) {
              cursor
              lessons {
                id
                name
              }
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { course },
        } = body
        expect(course).toEqual({
          id: '1',
          name: 'course',
          description: 'course description',
          language: {
            id: '1',
            name: 'English',
            nativeName: 'English',
            fullname: 'English (English)',
          },
          paginatedLessons: {
            cursor: 1000,
            lessons: [
              {
                id: '1',
                name: 'lesson 1',
              },
            ],
          },
        })
      })
  })

  it('/graphql (POST) addCourse', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          addCourse (newCourse: {
            name: "new course",
            description: "new course description"
            languageId: "2"
          }) {
            id
            name
            description
            language {
              id
            }
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { addCourse },
        } = body
        expect(addCourse).toEqual({
          id: '10',
          name: 'new course',
          description: 'new course description',
          language: {
            id: '2',
          },
        })
      })
  })

  it('/graphql (POST) updateCourse', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          updateCourse (updateCourse: {
            id: "1",
            name: "mod course",
            description: "mod course description"
          }) {
            id
            name
            description
        }}`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          data: { updateCourse },
        } = body
        expect(updateCourse).toEqual({
          id: '1',
          name: 'mod course',
          description: 'mod course description',
        })
      })
  })
})
