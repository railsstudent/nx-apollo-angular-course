import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'nx-apollo-angular-course-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(titleService: Title) {
    titleService.setTitle('Spanish Notes App')
  }
}
