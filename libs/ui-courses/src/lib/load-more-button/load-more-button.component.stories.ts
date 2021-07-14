import { action } from '@storybook/addon-actions'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { LoadMoreButtonComponent } from './load-more-button.component'

export default {
  title: 'LoadMoreButtonComponent',
  component: LoadMoreButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LoadMoreButtonComponent>

const loadMoreActionsData = {
  loadMore: action('loadMore'),
}

const Template: Story<LoadMoreButtonComponent> = (args: LoadMoreButtonComponent) => ({
  component: LoadMoreButtonComponent,
  props: {
    ...args,
    ...loadMoreActionsData,
  },
})

export const Primary = Template.bind({})
Primary.args = {
  loading: false,
  color: 'green',
}
