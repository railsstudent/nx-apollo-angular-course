import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { NewLessonInput } from '@nx-apollo-angular-course/api-interfaces';
import { AlertService, Course, CourseService, Lesson, LessonService } from '@nx-apollo-angular-course/data-access';
import { Observable, of } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'nx-apollo-angular-course-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsComponent implements OnInit {
  errMsg$!: Observable<string>;
  successMsg$!: Observable<string>;
  course$!: Observable<Course | undefined>;
  lessons$!: Observable<Lesson[]>;
  cursor = -1;
  loading = false;

  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private lessonService: LessonService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      switchMap(params => {
        const courseId = params.get('id');
        return courseId ? this.courseService.getCourse(courseId) : of (undefined);
      }),
    );
    this.lessons$ = this.course$.pipe(
      tap(course => this.cursor = course?.paginatedLessons?.cursor || -1),
      map(course => course?.paginatedLessons?.lessons || []));
    this.errMsg$ = this.alertService.errMsg$;
    this.successMsg$ = this.alertService.successMsg$;
  }

  trackByFunc(_index: number, lesson: Lesson): string {
    return lesson.id;
  }

  submitNewLesson(course: Course, input: NewLessonInput): void {
    const { name } = input;
    if (course) {
      this.lessonService.addLesson(course, {
        name,
        courseId: course.id
      })
      .subscribe();
    }
  }

  loadMore(course: Course): void {
    if (course) {
      this.loading = true;
      this.courseService
        .nextLessons({ courseId: course.id, cursor: this.cursor })
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe();
    }
  }
}
