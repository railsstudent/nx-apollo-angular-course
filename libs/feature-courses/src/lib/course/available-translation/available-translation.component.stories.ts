import { action } from '@storybook/addon-actions'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { AvailableTranslationComponent } from './available-translation.component'
import { availableTranslations } from '../storybook'

export default {
  title: 'AvailableTranslationComponent',
  component: AvailableTranslationComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<AvailableTranslationComponent>

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
  },
})

export const Primary = Template.bind({})
Primary.args = {
  availableTranslations,
  selectedTranslation: {
    id: '1',
    text: 'Good morning',
  },
}
