import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { TasksListPageComponent } from './pages/tasks-list-page/tasks-list-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    DetailedPageComponent,
    TasksListPageComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
  ],
})
export class TasksModule { }
