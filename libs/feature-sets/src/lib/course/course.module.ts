import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';

@NgModule({
  declarations: [
    CourseListComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CourseListComponent
  ]
})
export class CourseModule { }
