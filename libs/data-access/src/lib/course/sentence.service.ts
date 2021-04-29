import { Injectable } from '@angular/core'
import { gql } from 'apollo-angular'
import { Observable, EMPTY } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import {
  AddSentenceGQL,
  AddSentenceInput,
  AddTranslationInput,
  AddTranslationGQL,
  TranslationGQL,
  Sentence,
  DeleteTranslationGQL,
  Lesson,
  DeleteSentenceGQL,
  Translation,
} from '../generated/generated'
import { AlertService } from './alert.service'

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  constructor(
    private translationGQL: TranslationGQL,
    private addSentenceGQL: AddSentenceGQL,
    private addTranslationGQL: AddTranslationGQL,
    private deleteTranslationGQL: DeleteTranslationGQL,
    private deleteSetenceGQL: DeleteSentenceGQL,
    private alertService: AlertService,
  ) {}

  getTranslation(sentenceId: string, languageId: string): Observable<Translation> {
    return this.translationGQL
      .watch(
        {
          sentenceId,
          languageId,
        },
        {},
      )
      .valueChanges.pipe(
        map(({ data }) => data.getTranslation as Translation),
        catchError((err: Error) => {
          this.alertService.setError(err.message)
          return EMPTY
        }),
      )
  }

  addSentence(lesson: Lesson, newSentence: AddSentenceInput): Observable<Sentence> {
    this.alertService.clearMsgs()
    return this.addSentenceGQL
      .mutate(
        {
          newSentence,
        },
        {
          update: (cache, { data }) => {
            const returnedSentence = data?.addSentence
            cache.modify({
              id: cache.identify(lesson),
              fields: {
                paginatedSentences(existingSentenceRefs = { cursor: -1, sentences: [] }, { readField }): any[] {
                  const newSentenceRef = cache.writeFragment({
                    data: returnedSentence,
                    fragment: gql`
                      fragment NewSentence on Sentence {
                        id
                        text
                      }
                    `,
                  })
                  // Quick safety check - if the new sentence is already
                  // present in the cache, we don't need to add it again.
                  if (
                    returnedSentence &&
                    existingSentenceRefs.sentences.some((ref: any) => readField('id', ref) === returnedSentence.id)
                  ) {
                    return existingSentenceRefs
                  }
                  return {
                    ...existingSentenceRefs,
                    sentences: [...existingSentenceRefs.sentences, newSentenceRef],
                  }
                },
              },
            })
          },
        },
      )
      .pipe(
        map(({ data }) => data?.addSentence as Sentence),
        tap((addSentence: Sentence) => this.alertService.setSuccess(`${addSentence.text} is added.`)),
        catchError((err: Error) => {
          this.alertService.setError(err.message)
          return EMPTY
        }),
      )
  }

  deleteSentence(lesson: Lesson, sentenceId: string): Observable<Sentence> {
    this.alertService.clearMsgs()
    return this.deleteSetenceGQL
      .mutate(
        {
          id: sentenceId,
        },
        {
          update: (cache, { data }) => {
            const returnedSentence = data?.deleteSentence
            const sentence = returnedSentence?.sentence
            const translations = returnedSentence?.translations || []
            cache.modify({
              id: cache.identify(lesson),
              fields: {
                paginatedSentences(existingSentenceRefs = { cursor: -1, sentences: [] }, { readField }): any[] {
                  const sentences = existingSentenceRefs.sentences
                  const filteredSentences = sentences.filter((ref: any) => sentence?.id !== readField('id', ref))
                  return {
                    ...existingSentenceRefs,
                    sentences: filteredSentences,
                  }
                },
              },
            })

            if (translations && translations.length > 0) {
              for (const translation of translations) {
                cache.evict({ id: translation.id })
              }
              cache.gc()
            }
          },
        },
      )
      .pipe(
        map(({ data }) => data?.deleteSentence?.sentence as Sentence),
        tap((deletedSentence: Sentence) => this.alertService.setSuccess(`${deletedSentence.text} is deleted.`)),
        catchError((err: Error) => {
          this.alertService.setError(err.message)
          return EMPTY
        }),
      )
  }

  addTranslate(sentence: Sentence, newTranslation: AddTranslationInput): Observable<Translation> {
    this.alertService.clearMsgs()
    return this.addTranslationGQL
      .mutate(
        {
          newTranslation,
        },
        {
          update: (cache, { data }) => {
            const returnedTranslation = data?.addTranslation
            cache.modify({
              id: cache.identify(sentence),
              fields: {
                availableTranslations(existingLanguageRefs = [], { readField }): any[] {
                  const newAvailableLangRef = cache.writeFragment({
                    data: returnedTranslation.language,
                    fragment: gql`
                      fragment NewLanguage on Language {
                        id
                        name
                      }
                    `,
                  })
                  // Quick safety check - if the new language is already
                  // present in the cache, we don't need to add it again.
                  if (
                    returnedTranslation &&
                    existingLanguageRefs.some((ref: any) => readField('id', ref) === returnedTranslation.id)
                  ) {
                    return existingLanguageRefs
                  }
                  return [...existingLanguageRefs, newAvailableLangRef]
                },
              },
            })
          },
        },
      )
      .pipe(
        map(({ data }) => data?.addTranslation as Translation),
        tap((addTranslation: Translation) => this.alertService.setSuccess(`${addTranslation.text} is added.`)),
        catchError((err: Error) => {
          this.alertService.setError(err.message)
          return EMPTY
        }),
      )
  }

  deleteTranslate(sentence: Sentence, translationId: string): Observable<Translation> {
    this.alertService.clearMsgs()
    return this.deleteTranslationGQL
      .mutate(
        {
          id: translationId,
        },
        {
          update: (cache, { data }) => {
            const returnedTranslation = data?.deleteTranslation
            const language = data?.deleteTranslation?.language

            cache.modify({
              id: cache.identify(sentence),
              fields: {
                availableTranslations(existingLanguageRefs = [], { readField }): any[] {
                  return existingLanguageRefs.filter((ref: any) => language?.id !== readField('id', ref))
                },
              },
            })

            if (returnedTranslation) {
              const evictedId = cache.identify(returnedTranslation)
              cache.evict({ id: evictedId })
              cache.gc()
            }
          },
        },
      )
      .pipe(
        map(({ data }) => data?.deleteTranslation as Translation),
        tap((translation: Translation) => this.alertService.setSuccess(`${translation.text} is deleted.`)),
        catchError((err: Error) => {
          this.alertService.setError(err.message)
          return EMPTY
        }),
      )
  }
}
