import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './../add-course/add-course.component';
import { AlertService, CourseService } from '@nx-apollo-angular-course/data-access';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CourseCardComponent } from '../course-card';
import { CourseListComponent } from './course-list.component';
import {
  AlertErrorComponent,
  AlertSuccessComponent,
  LoadMoreButtonComponent,
} from '@nx-apollo-angular-course/ui-courses'
import { mockAlerService, mockCourseService } from '../storybook';
import { ChangeDetectorRef } from '@angular/core';

export default {
  title: 'CourseListComponent',
  component: CourseListComponent,
  subcomponents: {
    CourseCardComponent,
    AlertSuccessComponent,
    AlertErrorComponent,
    AddCourseComponent,
    LoadMoreButtonComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [
        CourseListComponent,
        CourseCardComponent,
        AlertSuccessComponent,
        AlertErrorComponent,
        AddCourseComponent,
        LoadMoreButtonComponent
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: AlertService,
          useFactory: mockAlerService,
        },
        {
          provide: CourseService,
          useFactory: (alertService: AlertService) => mockCourseService(alertService),
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
      ]
    })
  ],
} as Meta<CourseListComponent>;

const Template: Story<CourseListComponent> = (args: CourseListComponent) => ({
  component: CourseListComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}
