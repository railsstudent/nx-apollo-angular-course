import { action } from '@storybook/addon-actions';
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

export const actionsData = {
  saySentence: action('saySentence')
}

const Template: Story<RateControlComponent> = (args: RateControlComponent) => ({
  component: RateControlComponent,
  props: {
    ...args,
    ...actionsData,
  }
});

export const Primary = Template.bind({});
Primary.args = {
    voiceName:  'Google espanol de Estados Unidos',
}
