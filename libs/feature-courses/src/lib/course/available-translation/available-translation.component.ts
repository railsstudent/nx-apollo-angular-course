import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Language, Translation } from '@nx-apollo-angular-course/data-access'

@Component({
  selector: 'nx-apollo-angular-course-available-translation',
  templateUrl: './available-translation.component.html',
})
export class AvailableTranslationComponent {
  @Input()
  availableTranslations: Language[] = []

  @Input()
  selectedTranslation: Translation | null = null

  @Output()
  deleteTranslation = new EventEmitter<string>()

  @Output()
  showTranslation = new EventEmitter<Translation>()

  @Output()
  closeTranslation = new EventEmitter<void>()

  trackByFunc(_index: number, availableTranslation: Language): string {
    return availableTranslation.id
  }
}
