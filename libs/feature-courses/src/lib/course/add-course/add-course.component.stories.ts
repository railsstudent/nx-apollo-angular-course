import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AddCourseComponent } from './add-course.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'AddCourseComponent',
  component: AddCourseComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    })
  ],
} as Meta<AddCourseComponent>;

export const actionData = {
  submitNewCourse: action('submitNewCourse')
}

const Template: Story<AddCourseComponent> = (args: AddCourseComponent) => ({
  component: AddCourseComponent,
  props: {
    ...args,
    ...actionData
  }
});


export const Primary = Template.bind({});
Primary.args = {
    languages:  [
      { id: '1', fullname: 'Chinese' },
      { id: '2', fullname: 'English' },
      { id: '3', fullname: 'Portuguese' }
    ],
}

