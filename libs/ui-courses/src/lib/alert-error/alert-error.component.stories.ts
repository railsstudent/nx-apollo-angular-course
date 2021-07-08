import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AlertErrorComponent } from './alert-error.component';

export default {
  title: 'AlertErrorComponent',
  component: AlertErrorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<AlertErrorComponent>;

const Template: Story<AlertErrorComponent> = (args: AlertErrorComponent) => ({
  component: AlertErrorComponent,
  props: args,
  template: `
    <nx-apollo-angular-course-alert-error>
      Lesson name is already used.
    </nx-apollo-angular-course-alert-error>
  `
});


export const Primary = Template.bind({});
Primary.args = {
}
