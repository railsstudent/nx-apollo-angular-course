import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LoadMoreButtonComponent } from './load-more-button.component';

export default {
  title: 'LoadMoreButtonComponent',
  component: LoadMoreButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<LoadMoreButtonComponent>;

const Template: Story<LoadMoreButtonComponent> = (args: LoadMoreButtonComponent) => ({
  component: LoadMoreButtonComponent,
  props: args,
});

const callback = (args: unknown) => {
  console.log('Callback fired', args)
}

export const Primary = Template.bind({});
Primary.args = {
    loading:  false,
    callbackFunction: callback.bind(this),
    someArg:  1,
    color:  'green',
}
