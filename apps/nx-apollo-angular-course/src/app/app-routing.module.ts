import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from '@nx-apollo-angular-course/feature-sets';


const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('@nx-apollo-angular-course/feature-sets').then(m => m.CourseModule)
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  { path: '**', component: CourseListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
