import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: ':id',
    component: DetailedPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule { }
