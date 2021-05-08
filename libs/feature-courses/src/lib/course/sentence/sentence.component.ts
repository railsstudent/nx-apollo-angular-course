import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { UntilDestroy } from '@ngneat/until-destroy'
import {
  Language,
  Lesson,
  Sentence,
  SentenceService,
  Translation,
  VoiceService,
} from '@nx-apollo-angular-course/data-access'
import { of, Observable, BehaviorSubject } from 'rxjs'
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
// import { tag } from 'rxjs-spy/operators/tag';
// import { create } from 'rxjs-spy';
// const spy = create();
// spy.log(/get-translation-.+/);
// spy.log('selected-translation');
// spy.log(/null-translation-.+/);

@UntilDestroy({})
@Component({
  selector: 'nx-apollo-angular-course-sentence',
  templateUrl: './sentence.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentenceComponent implements OnInit {
  @Input()
  sentence: Sentence | undefined | null = null

  @Input()
  index = 0

  @Input()
  lesson: Lesson | undefined | null = null

  translate$ = new BehaviorSubject<string | null>(null)
  selectedTranslation$: Observable<Translation | null> | null = null
  selectedVoice$: Observable<SpeechSynthesisVoice | undefined>

  constructor(private sentenceService: SentenceService, private voiceService: VoiceService) {}
  ngOnInit(): void {
    this.selectedTranslation$ = this.translate$.pipe(
      distinctUntilChanged(),
      switchMap((languageId) => {
        const sentenceId = this.sentence?.id || ''
        if (!sentenceId || !languageId) {
          return of(null)
        }
        return this.sentenceService.getTranslation(sentenceId, languageId)
        // .pipe(tag(`get-translation-${sentenceId}-${languageId}`));
      }),
      // tag('selected-translation')
    )

    const isReady = this.voiceService.isVoicesAvailable()
    const languageName = this.lesson?.course?.language?.name
    this.selectedVoice$ = isReady
      ? of(this.voiceService.getSelectedVoice(languageName))
      : this.voiceService.voicesAvailable$.pipe(
          map((ready: boolean) => (ready && languageName ? this.voiceService.getSelectedVoice(languageName) : undefined)),
        )
  }

  trackByFunc(_index: number, availableTranslation: Language): string {
    return availableTranslation.id
  }

  showTranslation(availableTranslation: Language): void {
    this.translate$.next(availableTranslation?.id)
  }

  deleteTranslation(translationId: string): void {
    const answer = confirm('Do you want to delete the translation?')
    if (answer) {
      if (!this.sentence) {
        alert('Sentence is missing')
        return
      }

      this.sentenceService
        .deleteTranslate(this.sentence, translationId)
        .pipe(tap(() => this.translate$.next(null)))
        .subscribe()
    }
  }

  deleteSentence(sentenceId: string): void {
    if (!sentenceId || !this.lesson) {
      return
    }

    const answer = confirm('Do you want to delete the sentence?')
    if (!answer) {
      return
    }

    this.sentenceService.deleteSentence(this.lesson, sentenceId).subscribe()
  }

  saySentence(selectedVoice: SpeechSynthesisVoice): void {
    const text = this.sentence?.text || ''
    if (text && selectedVoice) {
      this.voiceService.speak({ text, voice: selectedVoice })
    }
  }
}
