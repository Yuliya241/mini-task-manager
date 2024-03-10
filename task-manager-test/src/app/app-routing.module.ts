import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { TasksListPageComponent } from './tasks/pages/tasks-list-page/tasks-list-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    canActivate: [authGuard],
    loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'allTasks',
    canActivate: [authGuard],
    component: TasksListPageComponent,
  },
  {
    path: 'signin',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
