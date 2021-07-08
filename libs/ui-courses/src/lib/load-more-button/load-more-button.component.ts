import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'nx-apollo-angular-course-load-more-button',
  template: `
    <button [ngClass]="classNames" (click)="callbackFunction(someArg)" [disabled]="loading">
      {{ loading ? 'Loading...' : 'Load More' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreButtonComponent implements OnInit {
  @Input()
  loading = false

  @Input()
  callbackFunction!: (args: any) => void

  @Input()
  someArg: any | undefined = undefined

  @Input()
  color = 'blue'

  classNames = 'disabled:opacity-50 focus:outline-none focus:ring-2'

  ngOnInit(): void {
    this.classNames = `${this.classNames} bg-${this.color}-500 hover:bg-${this.color}-600 focus:ring-${this.color}-700`
  }
}
