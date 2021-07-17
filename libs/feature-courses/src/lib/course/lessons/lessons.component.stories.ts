import {
  AlertErrorComponent,
  AlertSuccessComponent,
  LoadMoreButtonComponent,
} from '@nx-apollo-angular-course/ui-courses'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RouterTestingModule } from '@angular/router/testing'
import { AddLessonComponent } from '../add-lesson/add-lesson.component'
import { LessonsComponent } from './lessons.component'
import { ActivatedRoute } from '@angular/router'
import {
  AddLessonInput,
  AlertService,
  Course,
  CourseService,
  LessonService,
} from '@nx-apollo-angular-course/data-access'
import { of, Subject, EMPTY } from 'rxjs'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { action } from '@storybook/addon-actions'

const course = {
  id: '1',
  name: 'Spanish 101',
  description: 'Beginner Spanish',
  paginatedLessons: {
    cursor: 100,
    lessons: [
      {
        id: '100',
        name: 'Greeting',
        totalSentences: 0,
        paginatedSentences: [],
      },
    ],
  },
}

const mockCourseService = () => ({
  getCourse() {
    return of(course)
  },
  nextLessons() {
    const lesson = {
      id: '101',
      name: 'Gender',
      totalSentences: 0,
      paginatedSentences: [],
    }
    const cursor = 200
    course.paginatedLessons.cursor = cursor
    course.paginatedLessons.lessons.push(lesson)

    return of({
      cursor,
      lessons: [lesson],
    })
  },
})

const mockAlerService = () => {
  const errMsgSub$ = new Subject<string>()
  const successMsgSub$ = new Subject<string>()

  return {
    clearMsgs() {
      errMsgSub$.next('')
      successMsgSub$.next('')
    },

    setError(message: string) {
      errMsgSub$.next(message)
    },

    setSuccess(message: string) {
      successMsgSub$.next(message)
    },

    errMsg$: errMsgSub$.asObservable(),
    successMsg$: successMsgSub$.asObservable(),
  }
}

const mockLessonService = (alertService: AlertService) => ({
  addLesson(course: Course, newLesson: AddLessonInput) {
    const lesson = {
      id: `${Date.now()}`,
      name: newLesson.name,
      course,
      totalSentences: 0,
    }

    alertService.clearMsgs()

    const exist = !!course.paginatedLessons.lessons.find((lesson) => lesson.name === newLesson.name)

    if (exist) {
      alertService.setError('Lesson exists')
      return EMPTY
    } else {
      course.paginatedLessons.lessons.push(lesson)
      alertService.setSuccess('Lesson added successfully')
      return of(lesson)
    }
  },
})

const mockActiveRoute = () => {
  return {
    get paramMap() {
      const objs = {
        get(key) {
          const values = { id: '1' }
          return values[key]
        },
      }
      return of(objs)
    },
  }
}

export default {
  title: 'LessonsComponent',
  component: LessonsComponent,
  subcomponents: {
    LoadMoreButtonComponent,
    AlertErrorComponent,
    AlertSuccessComponent,
    AddLessonComponent,
  },
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, ReactiveFormsModule, CommonModule],
      declarations: [
        LessonsComponent,
        LoadMoreButtonComponent,
        AlertErrorComponent,
        AlertSuccessComponent,
        AddLessonComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useFactory: mockActiveRoute,
        },
        {
          provide: AlertService,
          useFactory: mockAlerService,
        },
        {
          provide: CourseService,
          useFactory: mockCourseService,
        },
        {
          provide: LessonService,
          useFactory: (alertService: AlertService) => mockLessonService(alertService),
          deps: [AlertService],
        },
      ],
    }),
  ],
} as Meta<LessonsComponent>

const loadMoreActionsData = {
  loadMore: action('loadMore'),
}

const Template: Story<LessonsComponent> = (args: LessonsComponent) => ({
  component: LessonsComponent,
  props: {
    ...args,
    ...loadMoreActionsData,
  },
})

export const Primary = Template.bind({})
Primary.args = {}
