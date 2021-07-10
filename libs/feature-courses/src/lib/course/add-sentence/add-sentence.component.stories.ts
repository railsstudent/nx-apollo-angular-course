import { action } from '@storybook/addon-actions';
import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AddSentenceComponent } from './add-sentence.component';

export default {
  title: 'AddSentenceComponent',
  component: AddSentenceComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    })
  ],
} as Meta<AddSentenceComponent>;

export const actionData = {
  submitNewSentence: action('submitNewSentence')
}

const Template: Story<AddSentenceComponent> = (args: AddSentenceComponent) => ({
  component: AddSentenceComponent,
  props: {
    ...args,
    ...actionData,
  }
});


export const Primary = Template.bind({});
Primary.args = {
    language:  {
      id: '4',
      fullname: 'Spanish',
    },
}
