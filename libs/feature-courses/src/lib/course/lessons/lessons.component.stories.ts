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
import { AlertService, CourseService, LessonService } from '@nx-apollo-angular-course/data-access'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { action } from '@storybook/addon-actions'
import { mockActiveRoute, mockAlerService, mockCourseService, mockLessonService } from '../storybook'

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
