import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NewLessonInput } from '@nx-apollo-angular-course/api-interfaces'
import { Language } from '@nx-apollo-angular-course/data-access'

@Component({
  selector: 'nx-apollo-angular-course-add-lesson',
  templateUrl: './add-lesson.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLessonComponent implements OnInit {
  @Input()
  language: Language | undefined | null = undefined

  @Output()
  submitNewLesson = new EventEmitter<NewLessonInput>()

  form: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)], updateOn: 'blur' }),
    })
  }

  onSubmit($event: Event): void {
    $event.preventDefault()
    $event.stopPropagation()

    if (!this.form.valid) {
      return
    }
    this.submitNewLesson.emit({ name: this.form.value.name })
  }
}
