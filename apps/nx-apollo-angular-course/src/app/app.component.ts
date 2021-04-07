import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@nx-apollo-angular-course/api-interfaces';

@Component({
  selector: 'nx-apollo-angular-course-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
