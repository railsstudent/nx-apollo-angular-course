import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('@nx-apollo-angular-course/feature-courses').then((m) => m.CourseModule),
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'courses' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
