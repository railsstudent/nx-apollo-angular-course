import { Injectable } from '@angular/core'
import { Apollo, QueryRef } from 'apollo-angular'
import { EMPTY, of, Observable } from 'rxjs'
import { catchError, map, share, tap } from 'rxjs/operators'
import {
  AllCoursesGQL,
  LanguagesGQL,
  AddCourseGQL,
  Course,
  CourseGQL,
  Language,
  AllCoursesDocument,
  AllCoursesQuery,
  CursorPaginationArgs,
  NextLessonsGQL,
  Lesson,
  PaginatedItems,
} from '../generated/generated'
import { NewCourseInput, POLLING_INTERVAL } from '@nx-apollo-angular-course/api-interfaces'
import { AlertService } from './alert.service'

export const COURSE_LIMIT = 4
const INIT_ARGS: CursorPaginationArgs = {
  cursor: -1,
  limit: COURSE_LIMIT,
}

export const LESSON_LIMIT = 4
const INIT_LESSON_ARGS: CursorPaginationArgs = {
  cursor: -1,
  limit: LESSON_LIMIT,
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private allCoursesGQL: AllCoursesGQL,
    private languagesGQL: LanguagesGQL,
    private courseGQL: CourseGQL,
    private addCourseGQL: AddCourseGQL,
    private nextLessonGQL: NextLessonsGQL,
    private alertService: AlertService,
    private apollo: Apollo,
  ) {}

  addCourse(newCourse: NewCourseInput): Observable<Course> {
    this.alertService.clearMsgs()
    return this.addCourseGQL
      .mutate(
        {
          newCourse,
        },
        {
          update: (cache, { data }) => {
            const query = this.allCoursesGQL.document
            const returnedCourse = data?.addCourse
            const queryOptions = {
              query,
              variables: {
                args: INIT_ARGS,
              },
            }

            const { courses: cachedCourses = null }: any = cache.readQuery(queryOptions)
            const { cursor = -1, courses: existingCourses = [] } = cachedCourses
            const courses = {
              cursor,
              courses: existingCourses ? [...existingCourses, returnedCourse] : [returnedCourse],
            }
            cache.writeQuery({
              ...queryOptions,
              data: { courses },
            })
          },
        },
      )
      .pipe(
        map(({ data }) => data?.addCourse as Course),
        tap((addCourse: Course) => this.alertService.setSuccess(`${addCourse.name} is added.`)),
        catchError((err: Error) => {
          this.alertService.setError(err.message)
          return EMPTY
        }),
      )
  }

  getCourse(courseId: string): Observable<Course> {
    return this.courseGQL
      .watch(
        {
          courseId,
          args: INIT_LESSON_ARGS,
        },
        {
          pollInterval: POLLING_INTERVAL,
        },
      )
      .valueChanges.pipe(
        map(({ data }) => data.course as Course),
        catchError((err) => {
          this.alertService.setError(err.message)
          return EMPTY
        }),
      )
  }

  getLanguages(): Observable<Language[]> {
    return this.languagesGQL.watch({}).valueChanges.pipe(
      map(({ data }) => data.getLanguages),
      catchError((err) => {
        console.error(err)
        return of([] as Language[])
      }),
      share(),
    )
  }

  // getAllCourses(args: PaginationArgs): Observable<Course[]> {
  //   return this.allCoursesGQL.watch({ args }, { pollInterval: environment.pollingInterval })
  //     .valueChanges
  //     .pipe(
  //       map(({ data }) => data.courses as Course[]),
  //       catchError(err => {
  //         console.error(err);
  //         return of([] as Course[]);
  //       }),
  //     );
  // }

  getPaginatedCoursesQueryRef(): QueryRef<AllCoursesQuery> {
    return this.apollo.watchQuery<AllCoursesQuery>({
      query: AllCoursesDocument,
      variables: {
        args: INIT_ARGS,
      },
    })
  }

  nextLessons(input: { courseId: string; cursor: number }): Observable<PaginatedItems> {
    this.alertService.clearMsgs()
    const { courseId, cursor } = input
    const args: CursorPaginationArgs = {
      cursor,
      limit: LESSON_LIMIT,
    }
    return this.nextLessonGQL
      .mutate(
        {
          courseId,
          args,
        },
        {
          update: (cache, { data }) => {
            const query = this.courseGQL.document
            const nextLessons = data?.nextLessons as PaginatedItems
            const { cursor: nextCursor = -1, lessons: newLessons = [] } = nextLessons || {}
            const queryOptions = {
              query,
              variables: {
                courseId,
                args: INIT_LESSON_ARGS,
              },
            }
            const { course: cachedCourse = null }: any = cache.readQuery(queryOptions)
            const { paginatedLessons: prevPaginatedLessons = null } = cachedCourse
            const { lessons: prevLessons = [] } = prevPaginatedLessons
            const lessons = newLessons as Lesson[]

            const concatLessons = prevLessons ? [...prevLessons, ...lessons] : [...lessons]
            const uniqLessons = concatLessons.filter((c, index, self) => self.map((s) => s.id).indexOf(c.id) === index)

            const paginatedLessons = {
              cursor: nextCursor as number,
              lessons: uniqLessons,
            }

            const course = {
              ...cachedCourse,
              paginatedLessons,
            }

            cache.writeQuery({
              ...queryOptions,
              data: { course },
            })
          },
        },
      )
      .pipe(
        map(({ data }) => data?.nextLessons as PaginatedItems),
        catchError((err: Error) => EMPTY),
      )
  }
}
