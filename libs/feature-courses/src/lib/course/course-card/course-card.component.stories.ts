import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CourseCardComponent } from './course-card.component';
import {RouterTestingModule} from '@angular/router/testing';

export default {
  title: 'CourseCardComponent',
  component: CourseCardComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    })
  ],
} as Meta<CourseCardComponent>;

const Template: Story<CourseCardComponent> = (args: CourseCardComponent) => ({
  component: CourseCardComponent,
  props: args,
});


const course = {
  id: '1',
  name: 'Spanish 101',
  description: 'Beginner Spanish',
  language: {
    id: '1',
    fullname: 'Spanish (Espanol)'
  }
}

export const Primary = Template.bind({});
Primary.args = {
    course
}

export const CourseWithFlag = Template.bind({});
CourseWithFlag.args = {
  course: {
    ...course,
    language: {
      ...course.language,
      flag: "https://www.countryflags.io/es/flat/32.png"
    }
  }
}
