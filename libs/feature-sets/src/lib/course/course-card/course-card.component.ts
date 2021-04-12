import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Course } from '@nx-apollo-angular-course/data-access'

@Component({
  selector: 'nx-apollo-angular-course-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent implements OnInit {
  @Input()
  course: Course | undefined = undefined

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewLesson(): void {
    if (!this.course) {
      return
    }
    this.router.navigate(['courses', this.course.id, 'lessons'])
  }
}
