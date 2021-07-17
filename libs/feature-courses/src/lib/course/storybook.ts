import { NewTranslationInput, TextToSpeech } from '@nx-apollo-angular-course/api-interfaces'
import {
  AddLessonInput,
  AddSentenceInput,
  AlertService,
  Course,
  Lesson,
  Sentence,
} from '@nx-apollo-angular-course/data-access'
import { EMPTY, of, Subject } from 'rxjs'

export const availableTranslations = [
  { id: '101', name: 'English' },
  { id: '102', name: 'Chinese' },
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
    text: 'Good Morning',
  },
  {
    id: '2',
    language: {
      id: '102',
      name: 'Chinese',
      fullname: 'Chinese',
    },
    text: '早安',
  },
  {
    id: '3',
    language: {
      id: '103',
      name: 'Portuguese',
      fullname: 'Portuguese',
    },
    text: 'Bom dia',
  },
]

export const sentence = {
  id: '1',
  text: 'Buenos dias',
  availableTranslations,
  translations,
}

export const languages = [
  { id: '1', name: 'Chinese', fullname: 'Chinese' },
  { id: '2', name: 'English', fullname: 'English' },
  { id: '3', name: 'Portuguese', fullname: 'Portuguese' },
]

export const course = {
  id: '1',
  name: 'Spanish 101',
  description: 'Beginner Spanish',
  language: {
    id: '4',
    name: 'Spanish',
    fullname: 'Spanish',
    shinyFlag: 'https://www.countryflags.io/es/shiny/64.png',
  },
  paginatedLessons: {
    cursor: 100,
    lessons: [
      {
        id: '100',
        name: 'Greeting',
        totalSentences: 0,
        paginatedSentences: [],
      },
    ],
  },
}

const lesson = {
  id: '1',
  course,
  name: 'Food and drink',
  description: 'Beginner Spanish',
  totalSentences: 1,
  paginatedSentences: {
    cursor: 100,
    sentences: [
      {
        id: '100',
        text: 'Good morning',
        availableTranslations: [],
        translations: [],
      },
    ],
  },
}

export const mockAlerService = () => {
  const errMsgSub$ = new Subject<string>()
  const successMsgSub$ = new Subject<string>()

  return {
    clearMsgs() {
      errMsgSub$.next('')
      successMsgSub$.next('')
    },

    setError(message: string) {
      errMsgSub$.next(message)
    },

    setSuccess(message: string) {
      successMsgSub$.next(message)
    },

    errMsg$: errMsgSub$.asObservable(),
    successMsg$: successMsgSub$.asObservable(),
  }
}

export const mockVoiceService = () => {
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
    },
  }
}

export const mockActiveRoute = () => {
  return {
    get paramMap() {
      const objs = {
        get(key) {
          const values = { id: '1', lessonId: '1' }
          return values[key]
        },
      }
      return of(objs)
    },
  }
}

export const mockSentenceService = (alertService: AlertService) => ({
  getTranslation(_sentenceId, languageId) {
    const translation = translations.find((translation) => translation.language.id === languageId)
    return translation ? of(translation) : EMPTY
  },
  deleteTranslate: (_sentenceId, translationId) => {
    const translation = sentence.translations.find((translation) => translation.id === translationId)
    const languageId = translation?.language?.id || ''
    sentence.availableTranslations = sentence.availableTranslations.filter((language) => language.id !== languageId)
    return of(translation)
  },
  addSentence(lesson: Lesson, newSentence: AddSentenceInput) {
    const sentence = {
      id: `${Date.now()}`,
      text: newSentence.text,
      lesson,
      availableTranslations: [],
      translations: [],
    }

    alertService.clearMsgs()

    const exist = !!(lesson.paginatedSentences.sentences || []).find((sentence) => sentence.text === newSentence.text)

    if (exist) {
      alertService.setError('Sentence exists')
      return EMPTY
    } else {
      lesson.paginatedSentences.sentences.push(sentence)
      lesson.totalSentences = lesson.totalSentences + 1
      alertService.setSuccess('Sentence added successfully')
      return of(sentence)
    }
  },
  addTranslate(sentence: Sentence, newTranslation: NewTranslationInput) {
    const translation = {
      id: `${Date.now()}`,
      text: newTranslation.text,
      sentence,
      language: languages.find((language) => language.id === newTranslation.languageId),
    }

    alertService.clearMsgs()

    const exist = !!(sentence.availableTranslations || []).find((t) => t.id === newTranslation.languageId)

    if (exist) {
      alertService.setError('Translation exists')
      return EMPTY
    } else {
      sentence.availableTranslations.push(translation.language)
      sentence.translations.push(translation)
      alertService.setSuccess('Translation added successfully')
      return of(translation)
    }
  },
  deleteSentence(lesson: Lesson, sentenceId: string) {
    const sentences = lesson?.paginatedSentences?.sentences || []
    if (sentences.length > 0) {
      const sentence = sentences.find((item) => item.id === sentenceId)
      lesson.paginatedSentences.sentences = sentences.filter((item) => item.id !== sentenceId)
      lesson.totalSentences = lesson.totalSentences - 1
      return of(sentence)
    }
    return EMPTY
  },
})

export const mockCourseService = () => ({
  getCourse() {
    return of(course)
  },
  getLanguages() {
    return of(languages)
  },
  nextLessons() {
    const lesson = {
      id: '101',
      name: 'Gender',
      totalSentences: 0,
      paginatedSentences: [],
    }
    const cursor = 200
    course.paginatedLessons.cursor = cursor
    course.paginatedLessons.lessons.push(lesson)

    return of({
      cursor,
      lessons: [lesson],
    })
  },
})

export const mockLessonService = (alertService: AlertService) => ({
  getLesson() {
    return of(lesson)
  },
  nextSentences() {
    const id = Date.now()
    const sentence = {
      id: `101 ${id}`,
      text: `Good evening ${id}`,
      availableTranslations: [],
      translations: [],
    }
    const cursor = 200
    lesson.paginatedSentences.cursor = cursor
    lesson.paginatedSentences.sentences.push(sentence)
    lesson.totalSentences = lesson.totalSentences + 1
    return of({
      cursor,
      sentences: [sentence],
    })
  },
  addLesson(course: Course, newLesson: AddLessonInput) {
    const lesson = {
      id: `${Date.now()}`,
      name: newLesson.name,
      course,
      totalSentences: 0,
    }

    alertService.clearMsgs()

    const exist = !!course.paginatedLessons.lessons.find((lesson) => lesson.name === newLesson.name)

    if (exist) {
      alertService.setError('Lesson exists')
      return EMPTY
    } else {
      course.paginatedLessons.lessons.push(lesson)
      alertService.setSuccess('Lesson added successfully')
      return of(lesson)
    }
  },
})
