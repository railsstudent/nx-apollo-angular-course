import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Language } from '@nx-apollo-angular-course/data-access'
import { NewSentenceInput } from '@nx-apollo-angular-course/api-interfaces'

@Component({
  selector: 'nx-apollo-angular-course-add-sentence',
  templateUrl: './add-sentence.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AddSentenceComponent implements OnInit {
  @Input()
  language: Language | undefined | null = undefined

  @Output()
  submitNewSentence = new EventEmitter<NewSentenceInput>()

  form = new FormGroup({})

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: new FormControl('', { validators: [Validators.required, Validators.maxLength(1000)], updateOn: 'blur' }),
    })
  }

  onSubmit($event: Event): void {
    $event.preventDefault()
    $event.stopPropagation()

    if (!this.form.valid) {
      return
    }
    this.submitNewSentence.emit(this.form.value)
  }
}
