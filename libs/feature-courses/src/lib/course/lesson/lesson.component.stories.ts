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
import { AlertService, CourseService, LessonService, SentenceService } from '@nx-apollo-angular-course/data-access'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SentenceComponent } from '../sentence/sentence.component'
import { ChangeDetectorRef } from '@angular/core'
import {
  mockAlerService,
  mockActiveRoute,
  mockSentenceService,
  mockCourseService,
  mockLessonService,
} from '../storybook'

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
        RateControlComponent,
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
          useFactory: (alertService: AlertService) => mockCourseService(alertService),
          deps: [AlertService],
        },
        {
          provide: SentenceService,
          useFactory: (service: AlertService) => mockSentenceService(service),
          deps: [AlertService],
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

const Template: Story<LessonComponent> = (args: LessonComponent) => ({
  component: LessonComponent,
  props: {
    ...args,
  },
})

export const Primary = Template.bind({})
Primary.args = {}
