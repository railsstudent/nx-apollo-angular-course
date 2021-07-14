import { ReactiveFormsModule } from '@angular/forms';
import { AddTranslationComponent } from './../add-translation/add-translation.component';
import { AddSentenceComponent } from './../add-sentence/add-sentence.component';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LessonComponent } from './lesson.component';
import {
  AlertErrorComponent,
  AlertSuccessComponent,
  LoadMoreButtonComponent,
} from '@nx-apollo-angular-course/ui-courses'
import { of, Subject } from 'rxjs';
import { AlertService, CourseService, LessonService, SentenceService } from '@nx-apollo-angular-course/data-access';
import { action } from '@storybook/addon-actions';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

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

export default {
  title: 'LessonComponent',
  component: LessonComponent,
  subcomponents: {
    AddSentenceComponent,
    AddTranslationComponent,
    LoadMoreButtonComponent,
    AlertErrorComponent,
    AlertSuccessComponent,
  },
  decorators: [
    moduleMetadata({
      imports: [
        AddSentenceComponent,
        AddTranslationComponent,
        LoadMoreButtonComponent,
        AlertErrorComponent,
        AlertSuccessComponent,
        ReactiveFormsModule,
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
          useValue: {},
        },
        {
          provide: CourseService,
          useValue: {},
        },
        {
          provide: SentenceService,
          useValue: {},
        },
        {
          provide: ChangeDetectorRef,
          useValue: {},
        }
      ]
    })
  ],
} as Meta<LessonComponent>;

const lessonActionsData = {
  submitNewSentence: action('submitNewSentence'),
  submitNewTranlsation: action('submitNewTranlsation'),
  loadMore: action('loadMore')
}

const Template: Story<LessonComponent> = (args: LessonComponent) => ({
  component: LessonComponent,
  props: {
    ...args,
    ...lessonActionsData,
  }
});


export const Primary = Template.bind({});
Primary.args = {
}
