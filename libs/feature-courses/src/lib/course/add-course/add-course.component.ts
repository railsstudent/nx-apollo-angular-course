import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NewCourseInput } from '@nx-apollo-angular-course/api-interfaces'
import { Language } from '@nx-apollo-angular-course/data-access'

@Component({
  selector: 'nx-apollo-angular-course-add-course',
  templateUrl: './add-course.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCourseComponent implements OnInit, OnChanges {
  @Input()
  languages: Language[] = []

  @Output()
  submitNewCourse = new EventEmitter<NewCourseInput>()

  form = new FormGroup({})

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)], updateOn: 'blur' }),
      description: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(200)],
        updateOn: 'blur',
      }),
      languageId: new FormControl(this.languages[0]?.id, { validators: Validators.required, updateOn: 'change' }),
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { languages } = changes
    const { currentValue = [] } = languages
    const languageId = currentValue[0]?.id || ''
    const control = this.form.controls.languageId
    if (control) {
      control.setValue(languageId)
    }
  }

  onSubmit($event: Event): void {
    $event.preventDefault()
    $event.stopPropagation()

    if (!this.form.valid) {
      return
    }
    this.submitNewCourse.emit(this.form.value)
  }
}
