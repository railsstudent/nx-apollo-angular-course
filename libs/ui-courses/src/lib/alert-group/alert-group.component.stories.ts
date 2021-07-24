import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { AlertSuccessComponent } from '../alert-success/alert-success.component';
import { AlertGroupComponent } from './alert-group.component';

export default {
  title: 'AlertGroupComponent',
  component: AlertGroupComponent,
  subcomponents: {
    AlertErrorComponent,
    AlertSuccessComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [AlertErrorComponent, AlertSuccessComponent],
      imports: [],
    })
  ],
} as Meta<AlertGroupComponent>;

const Template: Story<AlertGroupComponent> = (args: AlertGroupComponent) => ({
  component: AlertGroupComponent,
  props: args,
});

export const Success = Template.bind({});
Success.args = {
  successMsg:  'Success message',
  errMsg:  '',
}

export const Error = Template.bind({});
Error.args = {
  successMsg:  '',
  errMsg:  'Error message',
}
