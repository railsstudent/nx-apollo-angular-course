import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Course } from '@nx-apollo-angular-course/data-access'

@Component({
  selector: 'nx-apollo-angular-course-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input()
  course: Course | undefined = undefined

  constructor(private router: Router) {}

  viewLesson(): void {
    if (!this.course) {
      return
    }
    this.router.navigate(['courses', this.course.id, 'lessons'])
  }
}
