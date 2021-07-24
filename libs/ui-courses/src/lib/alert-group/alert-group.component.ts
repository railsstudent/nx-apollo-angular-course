import { Component, Input } from '@angular/core';

@Component({
  selector: 'nx-apollo-angular-course-alert-group',
  template: `
    <nx-apollo-angular-course-alert-error *ngIf="errMsg">
      <span class="text-red-800">{{ errMsg }}</span>
    </nx-apollo-angular-course-alert-error>
    <nx-apollo-angular-course-alert-success *ngIf="successMsg">
      <span class="text-green-800">{{ successMsg }}</span>
    </nx-apollo-angular-course-alert-success>
  `
})
export class AlertGroupComponent {
  @Input()
  successMsg = ''

  @Input()
  errMsg = ''
}
