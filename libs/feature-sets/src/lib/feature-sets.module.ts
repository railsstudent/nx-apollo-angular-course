import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CourseModule } from './course/course.module';

@NgModule({
  imports: [CommonModule, CourseModule],
  exports: [CourseModule]
})
export class FeatureSetsModule {}
