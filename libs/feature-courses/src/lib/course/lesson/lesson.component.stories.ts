import { ReactiveFormsModule } from '@angular/forms'
import { AddTranslationComponent } from '../add-translation/add-translation.component'
import { AddSentenceComponent } from '../add-sentence/add-sentence.component'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { LessonComponent } from './lesson.component'
import { RateControlComponent } from '../../voice/rate-control/rate-control.component'

import {
  AlertErrorComponent,
  AlertSuccessComponent,
  LoadMoreButtonComponent,
} from '@nx-apollo-angular-course/ui-courses'
import { EMPTY, of, Subject } from 'rxjs'
import {
  AddSentenceInput,
  AlertService,
  CourseService,
  Lesson,
  LessonService,
  Sentence,
  SentenceService,
} from '@nx-apollo-angular-course/data-access'
// import { action } from '@storybook/addon-actions'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NewTranslationInput } from '@nx-apollo-angular-course/api-interfaces'
import { SentenceComponent } from '../sentence/sentence.component'
import { ChangeDetectorRef } from '@angular/core'

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

const mockActiveRoute = () => {
  return {
    get paramMap() {
      const objs = {
        get(key) {
          const values = { lessonId: '1' }
          return values[key]
        },
      }
      return of(objs)
    },
  }
}

const languages = [
  { id: '1', name: 'Chinese', fullname: 'Chinese' },
  { id: '2', name: 'English', fullname: 'English' },
  { id: '3', name: 'Portuguese', fullname: 'Portuguese' },
]

const mockCourseService = () => ({
  getLanguages() {
    return of(languages)
  },
})

const course = {
  id: '1',
  name: 'Spanish 101',
  description: 'Beginner Spanish',
  language: {
    id: '4',
    name: 'Spanish',
    fullname: 'Spanish',
    shinyFlag: 'https://www.countryflags.io/es/shiny/64.png',
  },
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

const lesson = {
  id: '1',
  course,
  name: 'Food and drink',
  description: 'Beginner Spanish',
  totalSentences: 1,
  paginatedSentences: {
    cursor: 100,
    sentences: [
      {
        id: '100',
        text: 'Good morning',
        availableTranslations: [],
        translations: [],
      },
    ],
  },
}

const mockLessonService = () => ({
  getLesson() {
    return of(lesson)
  },
  nextSentences() {
    const id = Date.now()
    const sentence = {
      id: `101 ${id}`,
      text: `Good evening ${id}`,
      availableTranslations: [],
      translations: [],
    }
    const cursor = 200
    lesson.paginatedSentences.cursor = cursor
    lesson.paginatedSentences.sentences.push(sentence)
    lesson.totalSentences = lesson.totalSentences + 1
    return of({
      cursor,
      sentences: [sentence],
    })
  },
})

const mockSentenceService = (alertService: AlertService) => ({
  addSentence(lesson: Lesson, newSentence: AddSentenceInput) {
    const sentence = {
      id: `${Date.now()}`,
      text: newSentence.text,
      lesson,
      availableTranslations: [],
      translations: [],
    }

    alertService.clearMsgs()

    const exist = !!(lesson.paginatedSentences.sentences || []).find((sentence) => sentence.text === newSentence.text)

    if (exist) {
      alertService.setError('Sentence exists')
      return EMPTY
    } else {
      lesson.paginatedSentences.sentences.push(sentence)
      lesson.totalSentences = lesson.totalSentences + 1
      alertService.setSuccess('Sentence added successfully')
      return of(sentence)
    }
  },
  addTranslate(sentence: Sentence, newTranslation: NewTranslationInput) {
    const translation = {
      id: `${Date.now()}`,
      text: newTranslation.text,
      sentence,
      language: languages.find((language) => language.id === newTranslation.languageId),
    }

    alertService.clearMsgs()

    const exist = !!(sentence.availableTranslations || []).find((t) => t.id === newTranslation.languageId)

    if (exist) {
      alertService.setError('Translation exists')
      return EMPTY
    } else {
      sentence.availableTranslations.push(translation.language)
      alertService.setSuccess('Translation added successfully')
      return of(translation)
    }
  },
})

export default {
  title: 'LessonComponent',
  component: LessonComponent,
  subcomponents: {
    AddSentenceComponent,
    AddTranslationComponent,
    LoadMoreButtonComponent,
    AlertErrorComponent,
    AlertSuccessComponent,
    SentenceComponent,
    RateControlComponent,
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, CommonModule],
      declarations: [
        AddSentenceComponent,
        AddTranslationComponent,
        LoadMoreButtonComponent,
        AlertErrorComponent,
        AlertSuccessComponent,
        SentenceComponent,
        RateControlComponent
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
          provide: LessonService,
          useFactory: mockLessonService,
        },
        {
          provide: CourseService,
          useFactory: mockCourseService,
        },
        {
          provide: SentenceService,
          useFactory: (service: AlertService) => mockSentenceService(service),
          deps: [AlertService]
        },
        {
          provide: ChangeDetectorRef,
          useValue: {
            markForCheck() {
              console.log('markForCheck')
            },
          },
        },
      ],
    }),
  ],
} as Meta<LessonComponent>

// const lessonActionsData = {
//   submitNewSentence: action('submitNewSentence'),
//   submitNewTranlsation: action('submitNewTranlsation'),
//   loadMore: action('loadMore'),
// }

const Template: Story<LessonComponent> = (args: LessonComponent) => ({
  component: LessonComponent,
  props: {
    ...args,
    // ...lessonActionsData,
  },
})

export const Primary = Template.bind({})
Primary.args = {}
