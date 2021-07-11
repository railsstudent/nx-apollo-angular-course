import { TextToSpeech } from '@nx-apollo-angular-course/api-interfaces';
import { SentenceService, VoiceService } from '@nx-apollo-angular-course/data-access';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SentenceComponent } from './sentence.component';
import { RateControlComponent } from '../../voice/rate-control/rate-control.component';
import { of } from 'rxjs';
import { availableTranslationActionsData } from '../available-translation/available-translation.component.stories';
import { rateControlActionsData } from '../../voice/rate-control/rate-control.component.stories';
import { AvailableTranslationComponent } from '../available-translation/available-translation.component';
import { CommonModule } from '@angular/common';

const mockVoiceService = () => {
  return {
    isVoicesAvailable() {
      return true
    },
    getSelectedVoice() {
      return {
        default: true,
        lang: '',
        localService: false,
        name: 'Google Spanish',
        voiceURI: '',
      }
    },
    stop() {
      alert('stop is called')
    },
    speak(speechInput: TextToSpeech) {
      const { text, voice, rate } = speechInput
      alert(`text: ${text}`)
      alert(voice)
      alert(`rate: ${rate}`)
    }
  }
}

const availableTranslations = [
  { id: '101', name: 'Chinese' },
  { id: '102', name: 'English' },
  { id: '103', name: 'Portuguese' },
]

const translations = [
  {
    id: '1',
    language: {
      id: '101',
      name: 'English',
      fullname: 'English',
    },
    text: 'Good Morning'
  },
  {
    id: '2',
    language: {
      id: '102',
      name: 'Chinese',
      fullname: 'Chinese',
    },
    text: '早安'
  },
  {
    id: '3',
    language: {
      id: '103',
      name: 'Portuguese',
      fullname: 'Portuguese',
    },
    text: 'Bom dia'
  }
]

const sentence = {
  id: '1',
  text: 'Buenos dias',
  availableTranslations,
  translations,
}

export default {
  title: 'SentenceComponent',
  component: SentenceComponent,
  subcomponents: {
    AvailableTranslationComponent,
    RateControlComponent
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [SentenceComponent, AvailableTranslationComponent, RateControlComponent],
      providers: [
        {
          provide: VoiceService,
          useFactory: mockVoiceService
        },
        {
          provide: SentenceService,
          userFactory: () => ({
            getTranslation(_sentenceId, languageId) {
              return translations.find(translation => translation.language.id === languageId)
            },
            deleteSentence: () => {
              console.log('sentenceService deleteSentence called')
              return of(sentence)
            }
          }),
        }
      ]
    }),
  ],
} as Meta<SentenceComponent>;

const Template: Story<SentenceComponent> = (args: SentenceComponent) => ({
  component: SentenceComponent,
  props: {
    ...args,
    ...rateControlActionsData,
    ...availableTranslationActionsData,
  }
});

export const Primary = Template.bind({});
Primary.args = {
    sentence,
    index:  1,
    lesson:  {
      course: {
        language: {
          name: 'Spanish'
        }
      }
    },
}
