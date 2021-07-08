import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AlertSuccessComponent } from './alert-success.component';

export default {
  title: 'AlertSuccessComponent',
  component: AlertSuccessComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<AlertSuccessComponent>;

const Template: Story<AlertSuccessComponent> = (args: AlertSuccessComponent) => ({
  component: AlertSuccessComponent,
  props: args,
  template: `
  <nx-apollo-angular-course-alert-success>
    Spanish Advanced Course is created.
  </nx-apollo-angular-course-alert-success>
`
});


export const Primary = Template.bind({});
Primary.args = {
}
