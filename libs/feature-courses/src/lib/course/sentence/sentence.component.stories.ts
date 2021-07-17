import { SentenceService, VoiceService } from '@nx-apollo-angular-course/data-access'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { SentenceComponent } from './sentence.component'
import { RateControlComponent } from '../../voice/rate-control/rate-control.component'
import { rateControlActionsData } from '../../voice/rate-control/rate-control.component.stories'
import { AvailableTranslationComponent } from '../available-translation/available-translation.component'
import { CommonModule } from '@angular/common'
import { mockVoiceService, mockSentenceService, sentence } from '../storybook'

export default {
  title: 'SentenceComponent',
  component: SentenceComponent,
  subcomponents: {
    AvailableTranslationComponent,
    RateControlComponent,
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [SentenceComponent, AvailableTranslationComponent, RateControlComponent],
      providers: [
        {
          provide: VoiceService,
          useFactory: mockVoiceService,
        },
        {
          provide: SentenceService,
          useFactory: mockSentenceService,
        },
      ],
    }),
  ],
} as Meta<SentenceComponent>

const Template: Story<SentenceComponent> = (args: SentenceComponent) => ({
  component: SentenceComponent,
  props: {
    ...args,
    ...rateControlActionsData,
  },
})

export const Primary = Template.bind({})
Primary.args = {
  sentence,
  index: 1,
  lesson: {
    course: {
      language: {
        name: 'Spanish',
      },
    },
  },
}
