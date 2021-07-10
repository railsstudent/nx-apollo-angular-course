import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LessonsComponent } from './lessons.component';

export default {
  title: 'LessonsComponent',
  component: LessonsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<LessonsComponent>;

const Template: Story<LessonsComponent> = (args: LessonsComponent) => ({
  component: LessonsComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}