export type NewCourseInput = {
  name: string
  description: string
  languageId: string
}

export type NewLessonInput = {
  name: string
}

export type NewSentenceInput = {
  text: string
}

export type NewTranslationInput = {
  text: string
  sentenceId: string
  languageId: string
}

export const POLLING_INTERVAL = 1 * 1000 * 60 * 30

export enum SpeechLanguage {
  Spanish = 'Spanish',
  Chinese = 'Chinese',
  English = 'English',
  Portuguese = 'Portuguese',
}
