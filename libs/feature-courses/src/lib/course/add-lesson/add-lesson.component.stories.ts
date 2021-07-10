import { action } from '@storybook/addon-actions';
import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AddLessonComponent } from './add-lesson.component';

export default {
  title: 'AddLessonComponent',
  component: AddLessonComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    })
  ],
} as Meta<AddLessonComponent>;

export const actionData = {
  submitNewLesson: action('submitNewLesson')
}

const Template: Story<AddLessonComponent> = (args: AddLessonComponent) => ({
  component: AddLessonComponent,
  props: {
    ...args,
    ... actionData
  },
});


export const Primary = Template.bind({});
Primary.args = {
    language:  {
      id: '4',
      fullname: 'Spanish',
    },
}
