import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SentenceComponent } from './sentence.component';

export default {
  title: 'SentenceComponent',
  component: SentenceComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<SentenceComponent>;

const Template: Story<SentenceComponent> = (args: SentenceComponent) => ({
  component: SentenceComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    sentence:  null,
    index:  0,
    lesson:  null,
}