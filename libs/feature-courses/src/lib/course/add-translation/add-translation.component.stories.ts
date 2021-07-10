import { action } from '@storybook/addon-actions';
import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AddTranslationComponent } from './add-translation.component';

export default {
  title: 'AddTranslationComponent',
  component: AddTranslationComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    })
  ],
} as Meta<AddTranslationComponent>;

export const actionData = {
  submitNewTranlsation: action('submitNewTranlsation')
}

const Template: Story<AddTranslationComponent> = (args: AddTranslationComponent) => ({
  component: AddTranslationComponent,
  props: {
    ...args,
    ...actionData,
  }
});

export const Primary = Template.bind({});
Primary.args = {
    languages:  [
      { id: '1', fullname: 'Chinese' },
      { id: '2', fullname: 'English' },
      { id: '3', fullname: 'Portuguese' }
    ],
    sentences:  [
      {
        id: '4',
        text: 'Buenos dias'
      },
      {
        id: '5',
        text: 'Buenas tardes'
      },
      {
        id: '6',
        text: 'Buenas noches'
      }
    ],
}
