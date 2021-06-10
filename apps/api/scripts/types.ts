export enum TRANS_LANG {
  ENG = 'English',
  CHN = 'Chinese',
  POR = 'Portuguese',
}

export interface SentenceTranslation {
  text: string
  translations: {
    lang: TRANS_LANG
    text: string
  }[]
}
