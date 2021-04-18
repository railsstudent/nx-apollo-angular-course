import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Language, Translation } from '@nx-apollo-angular-course/data-access'

@Component({
  selector: 'nx-apollo-angular-course-available-translation',
  templateUrl: './available-translation.component.html',
})
export class AvailableTranslationComponent implements OnInit {
  @Input()
  availableTranslations: Translation[] = []

  @Input()
  selectedTranslation: Translation | null = null

  @Output()
  deleteTranslation = new EventEmitter<string>()

  @Output()
  showTranslation = new EventEmitter<Translation>()

  @Output()
  closeTranslation = new EventEmitter<void>()

  constructor() {}

  ngOnInit(): void {}

  trackByFunc(index: number, availableTranslation: Language): string {
    return availableTranslation.id
  }
}