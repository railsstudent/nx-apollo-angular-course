import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RateControlComponent } from './rate-control.component';

export default {
  title: 'RateControlComponent',
  component: RateControlComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<RateControlComponent>;

const Template: Story<RateControlComponent> = (args: RateControlComponent) => ({
  component: RateControlComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    voiceName:  '',
}