import { action } from '@storybook/addon-actions';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AvailableTranslationComponent } from './available-translation.component';

export default {
  title: 'AvailableTranslationComponent',
  component: AvailableTranslationComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<AvailableTranslationComponent>;

export const availableTranslationActionsData = {
  deleteTranslation: action('deleteTranslation'),
  showTranslation: action('showTranslation'),
  closeTranslation: action('closeTranslation'),
}

const Template: Story<AvailableTranslationComponent> = (args: AvailableTranslationComponent) => ({
  component: AvailableTranslationComponent,
  props: {
    ...args,
    ...availableTranslationActionsData,
  }
});

const availableTranslations = [
  { id: '101', name: 'Chinese' },
  { id: '102', name: 'English' },
  { id: '103', name: 'Portuguese' },
]

export const Primary = Template.bind({});
Primary.args = {
    availableTranslations,
    selectedTranslation:  availableTranslations[0],
}

export const English = Template.bind({});
English.args = {
  availableTranslations,
  selectedTranslation:  availableTranslations[1],
}

export const Portuguese = Template.bind({});
Portuguese.args = {
  availableTranslations,
  selectedTranslation:  availableTranslations[2],
}
