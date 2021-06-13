export interface NewCourseInput {
  name: string
  description: string
  languageId: string
}

export interface NewLessonInput {
  name: string
}

export interface NewSentenceInput {
  text: string
}

export interface NewTranslationInput {
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
