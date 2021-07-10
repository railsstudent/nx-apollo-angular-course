import { CourseService } from '@nx-apollo-angular-course/data-access';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { of } from 'rxjs';
import { CourseCardComponent } from '../course-card';
import { CourseListComponent } from './course-list.component';

const mockCourserService = () => {
  return {
    getPaginatedCoursesQueryRef() {

    },
    getLanguages() {
      return of([
        { id: '1', fullname: 'Chinese' },
        { id: '2', fullname: 'English' },
        { id: '3', fullname: 'Portuguese' },
        { id: '4', fullname: 'Spanish' }
      ])
    }
  }
}

export default {
  title: 'CourseListComponent',
  component: CourseListComponent,
  decorators: [
    moduleMetadata({
      declarations: [CourseListComponent, CourseCardComponent],
      imports: [],
      providers: [
        {
          provider: CourseService,
          useFactory: mockCourserService
        }
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
