import { Injectable } from '@angular/core'
import { POLLING_INTERVAL } from '@nx-apollo-angular-course/api-interfaces'
import { gql } from 'apollo-angular'
import { EMPTY, Observable } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import {
  AddLessonGQL,
  AddLessonInput,
  LessonGQL,
  Course,
  Lesson,
  CursorPaginationArgs,
  NextSentencesGQL,
  PaginatedItems,
  Sentence,
} from '../generated/generated'
import { AlertService } from './alert.service'

const SENTENCE_LIMIT = 3
const INIT_SENTENCE_ARGS: CursorPaginationArgs = {
  cursor: -1,
  limit: SENTENCE_LIMIT,
}

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(
    private addLessonGQL: AddLessonGQL,
    private lessonGQL: LessonGQL,
    private nextSentencesGQL: NextSentencesGQL,
    private alertService: AlertService,
  ) {}

  addLesson(course: Course, newLesson: AddLessonInput): Observable<Lesson> {
    this.alertService.clearMsgs()
    return this.addLessonGQL
      .mutate(
        {
          newLesson,
        },
        {
          update: (cache, { data }) => {
            const returnedLesson = data?.addLesson

            cache.modify({
              id: cache.identify(course),
              fields: {
                paginatedLessons(existingLessonRefs = { lessons: [], cursor: -1 }, { readField }): any[] {
                  const newLessonRef = cache.writeFragment({
                    data: returnedLesson,
                    fragment: gql`
                      fragment NewLesson on Lesson {
                        id
                        name
                      }
                    `,
                  })
                  // Quick safety check - if the new lesson is already
                  // present in the cache, we don't need to add it again.
                  if (
                    returnedLesson &&
                    existingLessonRefs.lessons.some((ref: any) => readField('id', ref) === returnedLesson.id)
                  ) {
                    return existingLessonRefs
                  }
                  return {
                    ...existingLessonRefs,
                    lessons: [...existingLessonRefs.lessons, newLessonRef],
                  }
                },
              },
            })
          },
        },
      )
      .pipe(
        map(({ data }) => data?.addLesson as Lesson),
        tap((addLesson: Lesson) => this.alertService.setSuccess(`${addLesson.name} is added.`)),
        catchError((err: Error) => {
          this.alertService.setError(err.message)
          return EMPTY
        }),
      )
  }

  getLesson(lessonId: string, args: CursorPaginationArgs = INIT_SENTENCE_ARGS): Observable<Lesson> {
    return this.lessonGQL
      .watch(
        {
          lessonId,
          args,
        },
        {
          pollInterval: POLLING_INTERVAL,
        },
      )
      .valueChanges.pipe(map(({ data }) => data.getLesson as Lesson))
  }

  nextSentences(input: { lessonId: string; cursor: number }): Observable<PaginatedItems> {
    this.alertService.clearMsgs()
    const { lessonId, cursor } = input
    const args: CursorPaginationArgs = {
      cursor,
      limit: SENTENCE_LIMIT,
    }
    return this.nextSentencesGQL
      .mutate(
        {
          id: lessonId,
          args,
        },
        {
          update: (cache, { data }) => {
            const query = this.lessonGQL.document
            const nextSentences = data?.nextSentences as PaginatedItems
            const { cursor: nextCursor = -1, sentences: newSentences = [] } = nextSentences || {}
            const queryOptions = {
              query,
              variables: {
                lessonId,
                args: INIT_SENTENCE_ARGS,
              },
            }
            const { getLesson: cachedLesson = null }: any = cache.readQuery(queryOptions)
            const { paginatedSentences: prevPaginatedSentences = null } = cachedLesson
            const { sentences: prevSentences = [] } = prevPaginatedSentences
            const sentences = newSentences as Sentence[]

            const concatSentences = prevSentences ? [...prevSentences, ...sentences] : [...sentences]
            const uniqSentences = concatSentences.filter(
              (c, index, self) => self.map((s) => s.id).indexOf(c.id) === index,
            )

            const paginatedSentences = {
              cursor: nextCursor as number,
              sentences: uniqSentences,
            }

            const getLesson = {
              ...cachedLesson,
              paginatedSentences,
            }

            cache.writeQuery({
              ...queryOptions,
              data: { getLesson },
            })
          },
        },
      )
      .pipe(
        map(({ data }) => data?.nextSentences as PaginatedItems),
        catchError(() => EMPTY),
      )
  }
}
