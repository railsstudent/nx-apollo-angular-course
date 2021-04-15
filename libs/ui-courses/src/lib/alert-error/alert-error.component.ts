import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'nx-apollo-angular-course-alert-error',
  templateUrl: './alert-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertErrorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
