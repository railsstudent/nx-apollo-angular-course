import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'nx-apollo-angular-course-alert-success',
  templateUrl: './alert-success.component.html',
  styles: [
    `
      .close-button {
        width: 28px;
        height: 28px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertSuccessComponent {
  opened = true
}
