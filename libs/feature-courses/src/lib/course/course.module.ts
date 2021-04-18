import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CourseRoutingModule } from './course-routing.module'
import { CourseListComponent } from './course-list/course-list.component'
import { LessonsComponent } from './lessons/lessons.component'
import { CourseCardComponent } from './course-card/course-card.component'
import { AddCourseComponent } from './add-course/add-course.component'
import { AddLessonComponent } from './add-lesson/add-lesson.component'
import { AddSentenceComponent } from './add-sentence/add-sentence.component'
import { AddTranslationComponent } from './add-translation/add-translation.component'
import { LessonComponent } from './lesson/lesson.component'
import { SentenceComponent } from './sentence/sentence.component'
import { UiCoursesModule } from '@nx-apollo-angular-course/ui-courses'
import { AvailableTranslationComponent } from './available-translation/available-translation.component'

@NgModule({
  declarations: [
    CourseListComponent,
    LessonsComponent,
    CourseCardComponent,
    AddCourseComponent,
    AddLessonComponent,
    AddSentenceComponent,
    AddTranslationComponent,
    LessonComponent,
    SentenceComponent,
    AvailableTranslationComponent,
  ],
  imports: [CommonModule, CourseRoutingModule, ReactiveFormsModule, FormsModule, UiCoursesModule],
  exports: [
    CourseListComponent,
    LessonsComponent,
    CourseCardComponent,
    AddCourseComponent,
    AddLessonComponent,
    AddSentenceComponent,
    AddTranslationComponent,
    LessonComponent,
    SentenceComponent,
    AvailableTranslationComponent,
  ],
})
export class CourseModule {}
