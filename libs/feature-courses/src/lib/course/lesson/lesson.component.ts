import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UntilDestroy } from '@ngneat/until-destroy'
import { NewSentenceInput, NewTranslationInput } from '@nx-apollo-angular-course/api-interfaces'
import {
  AlertService,
  CourseService,
  Language,
  Lesson,
  LessonService,
  Sentence,
  SentenceService,
} from '@nx-apollo-angular-course/data-access'
import { combineLatest, EMPTY, Observable } from 'rxjs'
import { finalize, map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators'
// import { tag } from 'rxjs-spy/operators/tag';
// import { create } from 'rxjs-spy';
// const spy = create();
// spy.log('languages');
// spy.log('lesson');

@UntilDestroy({})
@Component({
  selector: 'nx-apollo-angular-course-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit {
  errMsg$!: Observable<string>
  successMsg$!: Observable<string>
  lesson$: Observable<Lesson> | null = null
  languages$: Observable<Language[]> | null = null
  cursor = -1
  loading = false

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private sentenceService: SentenceService,
    private courseService: CourseService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.errMsg$ = this.alertService.errMsg$
    this.successMsg$ = this.alertService.successMsg$

    const lesson$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const lessonId = params.get('lessonId')
        return lessonId ? this.lessonService.getLesson(lessonId) : EMPTY
      }),
    )
    const langs$ = this.courseService.getLanguages()

    const lessonLangs$ = combineLatest([lesson$, langs$]).pipe(
      map(([lesson, langs]) => ({
        lesson,
        langs,
      })),
      shareReplay(1),
    )

    this.lesson$ = lessonLangs$.pipe(
      pluck('lesson'),
      tap(({ paginatedSentences }: Lesson) => (this.cursor = paginatedSentences?.cursor || -1)),
    )
    this.languages$ = lessonLangs$.pipe(
      map(({ lesson, langs }) => {
        const langId = lesson?.course?.language?.id || ''
        return langId ? langs.filter((lang) => lang.id !== langId) : langs
      }),
      // tag(`languages`)
    )
  }

  trackByFunc(_index: number, sentence: Sentence): string {
    return sentence.id
  }

  submitNewSentence(lesson: Lesson, newInput: NewSentenceInput): void {
    const { text } = newInput

    if (lesson) {
      this.sentenceService.addSentence(lesson, { text, lessonId: lesson.id }).subscribe()
    }
  }

  submitTranslation(lesson: Lesson, newInput: NewTranslationInput): void {
    if (newInput && lesson) {
      const sentence = (lesson?.paginatedSentences?.sentences || []).find((s) => s.id === newInput.sentenceId)
      if (!sentence) {
        alert('Sentence does not exist')
        return
      }
      this.sentenceService.addTranslate(sentence, newInput).subscribe()
    }
  }

  loadMoreSentences(lesson: Lesson): void {
    if (lesson) {
      this.loading = true
      this.lessonService
        .nextSentences({ lessonId: lesson.id, cursor: this.cursor })
        .pipe(
          finalize(() => {
            this.loading = false
            this.cdr.markForCheck()
          }),
        )
        .subscribe()
    }
  }
}
