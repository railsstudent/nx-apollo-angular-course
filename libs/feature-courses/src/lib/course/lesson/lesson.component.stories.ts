import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LessonComponent } from './lesson.component';

export default {
  title: 'LessonComponent',
  component: LessonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<LessonComponent>;

const Template: Story<LessonComponent> = (args: LessonComponent) => ({
  component: LessonComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}