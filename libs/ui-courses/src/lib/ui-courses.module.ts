import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AlertErrorComponent } from './alert-error/alert-error.component'
import { AlertSuccessComponent } from './alert-success/alert-success.component'
import { LoadMoreButtonComponent } from './load-more-button/load-more-button.component';
import { AlertGroupComponent } from './alert-group/alert-group.component'

@NgModule({
  imports: [CommonModule],
  declarations: [AlertErrorComponent, AlertSuccessComponent, LoadMoreButtonComponent, AlertGroupComponent],
  exports: [AlertErrorComponent, AlertSuccessComponent, LoadMoreButtonComponent, AlertGroupComponent],
})
export class UiCoursesModule {}
